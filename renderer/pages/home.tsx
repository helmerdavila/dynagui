import React, { useState } from 'react';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { loadSharedConfigFiles } from '@aws-sdk/shared-ini-file-loader';
import to from 'await-to-js';
import os from 'os';
import crypto from 'crypto';

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
  const loadTables = async () => {
    const profiles = await loadSharedConfigFiles({ configFilepath: `${os.homedir()}/.aws/config` });
    const dynaguiAwsProfiles: DynaguiAwsProfile[] = [];

    for (const configFileProfile in profiles.configFile) {
      const dynaGuiAwsProfile: DynaguiAwsProfile = {
        uuid: crypto.randomUUID(),
        awsKey: '',
        awsSecret: '',
        profileName: '',
        regions: [],
      };
      console.log(configFileProfile);
      console.table(profiles.configFile[configFileProfile]);
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
    console.log('Component is rendering');
    const [error, tables] = await to(dynamoDb.send(new ListTablesCommand({})));
    console.table({ error, tables: tables.TableNames });
  };

  return (
    <div className="grow p-5">
      <h1 className="text-5xl">Hello from the component</h1>
      <h2 className="font-quicksand-bold">This is a bold component</h2>
      <button onClick={loadTables} className="bg-black mt-3 text-white rounded-full py-2 px-6">
        Load profiles
      </button>
      <h1 className="text-5xl">Profiles</h1>
      {awsProfiles.map((profile) => (
        <span key={profile.uuid} className="block">
          {profile.profileName}
        </span>
      ))}
    </div>
  );
};

export default Home;
