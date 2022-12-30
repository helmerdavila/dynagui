import React, { useState } from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDatabase } from '@helmerdavila/fontawesomehelmer/pro-light-svg-icons';
import Link from 'next/link';

enum SelectedOptionEnum {
  DATABASES,
  DB_1,
  DB_2,
  SETTINGS,
}

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedOption, setSelectedOption] = useState<number>(SelectedOptionEnum.DATABASES);
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-15 bg-zinc-300 shadow-lg items-center justify-between">
        <div>
          <Link href="home">
            <button
              className={classNames('block hover:cursor-pointer p-3 border-l-4', {
                'border-zinc-600': selectedOption === SelectedOptionEnum.DATABASES,
                'border-zinc-300': selectedOption !== SelectedOptionEnum.DATABASES,
              })}
              onClick={() => setSelectedOption(SelectedOptionEnum.DATABASES)}
            >
              <FontAwesomeIcon
                icon={faDatabase}
                className={classNames('h-8', {
                  'text-zinc-700': selectedOption === SelectedOptionEnum.DATABASES,
                  'text-zinc-400': selectedOption !== SelectedOptionEnum.DATABASES,
                })}
              />
            </button>
          </Link>
          <button
            className={classNames('block hover:cursor-pointer p-3 border-l-4', {
              'border-zinc-600': selectedOption === SelectedOptionEnum.DB_1,
              'border-zinc-300': selectedOption !== SelectedOptionEnum.DB_1,
            })}
            onClick={() => setSelectedOption(SelectedOptionEnum.DB_1)}
          >
            <FontAwesomeIcon
              icon={faDatabase}
              className={classNames('h-8', {
                'text-zinc-700': selectedOption === SelectedOptionEnum.DB_1,
                'text-zinc-400': selectedOption !== SelectedOptionEnum.DB_1,
              })}
            />
          </button>
          <button
            className={classNames('block hover:cursor-pointer p-3 border-l-4', {
              'border-zinc-600': selectedOption === SelectedOptionEnum.DB_2,
              'border-zinc-300': selectedOption !== SelectedOptionEnum.DB_2,
            })}
            onClick={() => setSelectedOption(SelectedOptionEnum.DB_2)}
          >
            <FontAwesomeIcon
              icon={faDatabase}
              className={classNames('h-8', {
                'text-zinc-700': selectedOption === SelectedOptionEnum.DB_2,
                'text-zinc-400': selectedOption !== SelectedOptionEnum.DB_2,
              })}
            />
          </button>
        </div>
        <div>
          <div className="flex flex-col w-15 bg-zinc-300 shadow-lg items-center">
            <Link href="settings">
              <button
                className={classNames('block hover:cursor-pointer p-3 border-l-4', {
                  'border-zinc-600': selectedOption === SelectedOptionEnum.SETTINGS,
                  'border-zinc-300': selectedOption !== SelectedOptionEnum.SETTINGS,
                })}
                onClick={() => setSelectedOption(SelectedOptionEnum.SETTINGS)}
              >
                <FontAwesomeIcon
                  icon={faCog}
                  className={classNames('h-8', {
                    'text-zinc-700': selectedOption === SelectedOptionEnum.SETTINGS,
                    'text-zinc-400': selectedOption !== SelectedOptionEnum.SETTINGS,
                  })}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
