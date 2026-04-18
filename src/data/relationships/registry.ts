import type { RelationshipConfig, RelationshipTypeId } from './types';
import romantic from './romantic';
import ex from './ex';
import situationship from './situationship';
import bestFriend from './best-friend';
import friend from './friend';
import sibling from './sibling';
import mother from './mother';
import father from './father';
import professional from './professional';

export const allConfigs: Record<RelationshipTypeId, RelationshipConfig> = {
  romantic,
  ex,
  situationship,
  'best-friend': bestFriend,
  friend,
  sibling,
  mother,
  father,
  professional,
};

/** Display order for the selector grid. */
export const allConfigList: RelationshipConfig[] = [
  romantic,
  ex,
  situationship,
  bestFriend,
  friend,
  sibling,
  mother,
  father,
  professional,
];

export function getConfig(id: RelationshipTypeId): RelationshipConfig {
  return allConfigs[id];
}
