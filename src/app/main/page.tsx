'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CompanyService } from '@/services/company/company.service';
import { ICompany } from '@/services/company/company.types';
import { useSession } from '@/hooks/useSession';
import styles from './MainPage.module.scss';

export default function MainPage() {
  const [company, setCompany] = useState<ICompany | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    CompanyService.getCompany('12', token)
      .then(setCompany)
      .catch(() => setError('Ошибка загрузки данных компании'));
  }, [token, router]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!company) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{company.name}</h1>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Company Details</h2>
        <div className={styles.details}>
          <div><span>Agreement:</span> {company.contract.no} / {new Date(company.contract.issue_date).toLocaleDateString()}</div>
          <div><span>Business entity:</span> {company.businessEntity}</div>
          <div><span>Company type:</span> {company.type.map((t) => capitalize(t)).join(', ')}</div>
          <div><span>Status:</span> {company.status}</div>
          <div><span>Responsible person:</span> {company.responsiblePerson ?? '—'}</div>
          <div><span>Phone number:</span> {company.phone ?? '—'}</div>
          <div><span>E-mail:</span> {company.email ?? '—'}</div>
        </div>
      </div>

      <div className={styles.photosBlock}>
        <h2 className={styles.cardTitle}>Photos</h2>
        <div className={styles.photos}>
          {company.photos.map((photo) => (
            <img
              key={photo.filepath}
              src={photo.thumbpath}
              alt={photo.name}
              className={styles.photo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function capitalize(str: string) {
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
