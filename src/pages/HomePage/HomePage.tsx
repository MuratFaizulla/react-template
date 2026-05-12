import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth, useIntl, useToast } from '@features';
import { ROUTES } from '@shared/config';
import { Skeleton, Spinner } from '@shared/ui';

import styles from './HomePage.module.css';

const FEATURE_KEYS = [
  { icon: '🚀', titleKey: 'home.features.stack.title', descKey: 'home.features.stack.desc' },
  {
    icon: '🏗️',
    titleKey: 'home.features.architecture.title',
    descKey: 'home.features.architecture.desc'
  },
  { icon: '🔐', titleKey: 'home.features.auth.title', descKey: 'home.features.auth.desc' },
  { icon: '🎨', titleKey: 'home.features.theming.title', descKey: 'home.features.theming.desc' },
  { icon: '📦', titleKey: 'home.features.state.title', descKey: 'home.features.state.desc' },
  { icon: '🛡️', titleKey: 'home.features.errors.title', descKey: 'home.features.errors.desc' }
];

export const HomePage: React.FC = () => {
  const { isAuth, role } = useAuth();
  const { translateMessage } = useIntl();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const { showToast } = useToast();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.hero_badge}>{translateMessage('home.badge')}</div>
        <h1 className={styles.hero_title}>
          {translateMessage('home.hero.title1')}
          <br />
          <span>{translateMessage('home.hero.title2')}</span>
        </h1>
        <p className={styles.hero_subtitle}>{translateMessage('home.hero.subtitle')}</p>

        {isAuth ? (
          <div className={styles.hero_auth_row}>
            <div className={styles.auth_badge}>
              {role === 'admin' ? '👑' : '👤'}&nbsp;
              {role === 'admin'
                ? translateMessage('home.hero.role.admin')
                : translateMessage('home.hero.role.user')}
            </div>
          </div>
        ) : (
          <div className={styles.hero_actions}>
            <button className={styles.btn_primary} onClick={() => navigate(ROUTES.AUTH)}>
              {translateMessage('home.hero.getStarted')}
            </button>
            <button className={styles.btn_ghost} onClick={() => navigate(ROUTES.ABOUT)}>
              {translateMessage('home.hero.learnMore')}
            </button>
          </div>
        )}
      </section>

      <section className={styles.features}>
        <h2 className={styles.section_title}>{translateMessage('home.features.title')}</h2>
        <div className={styles.features_grid}>
          {FEATURE_KEYS.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className={styles.feature_card}>
              <span className={styles.feature_icon}>{icon}</span>
              <h3 className={styles.feature_title}>{translateMessage(titleKey)}</h3>
              <p className={styles.feature_desc}>{translateMessage(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.loaders}>
        <h2 className={styles.section_title}>Loading States</h2>
        <div className={styles.loaders_grid}>
          <div className={styles.demo_card}>
            <h3 className={styles.demo_card_title}>Spinner</h3>
            <div className={styles.spinner_row}>
              <div className={styles.spinner_item}>
                <Spinner size='sm' />
                <span className={styles.spinner_label}>sm</span>
              </div>
              <div className={styles.spinner_item}>
                <Spinner size='md' />
                <span className={styles.spinner_label}>md</span>
              </div>
              <div className={styles.spinner_item}>
                <Spinner size='lg' />
                <span className={styles.spinner_label}>lg</span>
              </div>
            </div>
          </div>

          <div className={styles.demo_card}>
            <div className={styles.demo_card_header}>
              <h3 className={styles.demo_card_title}>Skeleton</h3>
              <button className={styles.toggle_btn} onClick={() => setIsLoading((v) => !v)}>
                {isLoading ? 'Show content' : 'Show loading'}
              </button>
            </div>

            {isLoading ? (
              <div className={styles.skeleton_demo}>
                <div className={styles.skeleton_row}>
                  <Skeleton width={44} height={44} borderRadius={22} />
                  <div className={styles.skeleton_lines}>
                    <Skeleton height={13} width='55%' />
                    <Skeleton height={11} width='35%' />
                  </div>
                </div>
                <Skeleton height={11} />
                <Skeleton height={11} width='88%' />
                <Skeleton height={11} width='70%' />
              </div>
            ) : (
              <div className={styles.skeleton_demo}>
                <div className={styles.skeleton_row}>
                  <div className={styles.avatar}>JD</div>
                  <div className={styles.skeleton_lines}>
                    <div className={styles.content_name}>John Doe</div>
                    <div className={styles.content_role}>Developer</div>
                  </div>
                </div>
                <p className={styles.content_text}>
                  Skeleton placeholders replaced by real content once data has loaded.
                </p>
              </div>
            )}
          </div>

          <div className={styles.demo_card}>
            <h3 className={styles.demo_card_title}>Toast</h3>
            <div className={styles.toast_row}>
              <button
                className={`${styles.toast_btn} ${styles.toast_btn_success}`}
                onClick={() =>
                  showToast({ type: 'success', message: 'Action completed successfully!' })
                }
              >
                Success
              </button>
              <button
                className={`${styles.toast_btn} ${styles.toast_btn_error}`}
                onClick={() => showToast({ type: 'error', message: 'Something went wrong.' })}
              >
                Error
              </button>
              <button
                className={`${styles.toast_btn} ${styles.toast_btn_warning}`}
                onClick={() =>
                  showToast({ type: 'warning', message: 'Please review before continuing.' })
                }
              >
                Warning
              </button>
              <button
                className={`${styles.toast_btn} ${styles.toast_btn_info}`}
                onClick={() =>
                  showToast({ type: 'info', message: 'Here is some useful information.' })
                }
              >
                Info
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
