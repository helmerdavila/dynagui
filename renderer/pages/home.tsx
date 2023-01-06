import React, { useState } from 'react';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { loadSharedConfigFiles } from '@aws-sdk/shared-ini-file-loader';
import to from 'await-to-js';
import os from 'os';
import crypto from 'crypto';
import fs from 'fs';

interface DynaguiAwsProfile {
  uuid: string;
  profileName: string;
  regions: string[];
  awsKey: string;
  awsSecret: string;
}

const Home = () => {
  // TODO: Create a class Dynagui Aws Profiles
  // TODO: Create a class  Dynagui Aws Profile with the interface structure and methods
  // TODO: Store all aws profiles in memory, file, somewhere

  const [awsProfiles, setAwsProfiles] = useState<DynaguiAwsProfile[]>([]);
  const [errorConfigFile, setErrorConfigFile] = useState<string>(null);
  const [successConfigFile, setSuccessConfigFile] = useState<string>(null);
  const [errorCredentialsFile, setErrorCredentialsFile] = useState<string>(null);
  const [successCredentialsFile, setSuccessCredentialsFile] = useState<string>(null);
  const [tables, setTables] = useState<string[]>([]);

  const getAwsConfigFilePath = (): string => `${os.homedir()}/.aws/config`;

  const getAwsCredentialsPath = (): string => `${os.homedir()}/.aws/credentials`;

  const userHasConfigFile = async () => {
    const awsConfigFilePath = getAwsConfigFilePath();

    if (!fs.existsSync(awsConfigFilePath)) {
      setErrorConfigFile(`${awsConfigFilePath} file not found`);
      return;
    }

    setSuccessConfigFile('Config file found!');
  };

  const userHasCredentialsFile = async () => {
    const awsCredentialsPath = getAwsCredentialsPath();

    if (!fs.existsSync(awsCredentialsPath)) {
      setErrorCredentialsFile(`${awsCredentialsPath} file not found`);
      return;
    }

    setSuccessCredentialsFile('Credentials file found!');
  };

  const validateAwsFiles = async () => {
    await userHasConfigFile();
    await userHasCredentialsFile();
    await loadTables();
  };

  const loadTables = async () => {
    const [errLoadSharedConfig, profiles] = await to(loadSharedConfigFiles({ configFilepath: getAwsConfigFilePath() }));

    if (errLoadSharedConfig) {
      return;
    }

    const dynaguiAwsProfiles: DynaguiAwsProfile[] = [];

    for (const configFileProfile in profiles.configFile) {
      const dynaGuiAwsProfile: DynaguiAwsProfile = {
        uuid: crypto.randomUUID(),
        awsKey: '',
        awsSecret: '',
        profileName: '',
        regions: [],
      };
      dynaGuiAwsProfile.profileName = configFileProfile;
      dynaGuiAwsProfile.regions = [profiles.configFile[configFileProfile]['region']];
      dynaguiAwsProfiles.push(dynaGuiAwsProfile);
    }

    for (const credentialsProfile in profiles.credentialsFile) {
      const dynaGuiAwsProfileIndex = dynaguiAwsProfiles.findIndex(
        (dynauiProfile) => dynauiProfile.profileName === credentialsProfile,
      );
      dynaguiAwsProfiles[dynaGuiAwsProfileIndex].awsKey =
        profiles.credentialsFile[credentialsProfile]['aws_access_key_id'];
      dynaguiAwsProfiles[dynaGuiAwsProfileIndex].awsSecret =
        profiles.credentialsFile[credentialsProfile]['aws_secret_access_id'];
    }

    setAwsProfiles(dynaguiAwsProfiles);

    const dynamoDb = new DynamoDBClient({
      credentials: fromIni({ configFilepath: `${os.homedir()}/.aws/config` }),
      region: 'ca-central-1',
    });
    const [error, tables] = await to(dynamoDb.send(new ListTablesCommand({})));
    setTables(tables.TableNames);
  };

  return (
    <div className="grow p-5">
      <h1 className="text-4xl mb-3">Dashboard</h1>
      {errorConfigFile ? (
        <section className="mb-3 bg-red-200 text-red-600 w-full px-6 py-4 rounded-2xl">{errorConfigFile}</section>
      ) : null}
      {successConfigFile ? (
        <section className="mb-3 bg-green-200 text-green-600 w-full px-6 py-4 rounded-2xl">{successConfigFile}</section>
      ) : null}
      {errorCredentialsFile ? (
        <section className="bg-red-200 text-red-600 w-full px-6 py-4 rounded-2xl">{errorCredentialsFile}</section>
      ) : null}
      {successCredentialsFile ? (
        <section className="mb-3 bg-green-200 text-green-600 w-full px-6 py-4 rounded-2xl">
          {successCredentialsFile}
        </section>
      ) : null}
      <button onClick={validateAwsFiles} className="bg-black mt-3 text-white rounded-full py-2 px-6">
        Load profiles
      </button>
      <section>
        <h2 className="text-2xl">Profiles</h2>
      </section>
      {tables.map((table, index) => (
        <span key={index} className="block">
          {table}
        </span>
      ))}
    </div>
  );
};

export default Home;
