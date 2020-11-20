import React, { Fragment } from 'react';
import { Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        rocket {
          id
          name
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
`;

export default function launches() {
  const { data, loading, error } = useQuery(GET_LAUNCHES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>ERROR</Text>;
  if (!data) return <Text>Not found</Text>;

  return (
    <View>
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map((launch, index) => {
          return (
            <Fragment key={`${launch.rocket.id}-${index}`}>
              <Text>{launch.mission ? launch.mission.name : ''}</Text>
              <Text>{launch.rocket && launch.rocket.name}</Text>
            </Fragment>
          );
        })}
    </View>
  );
}
