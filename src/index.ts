import './legacy';

export { Client, JoinOptions } from './Client';
export { Protocol, ErrorCode } from './Protocol';
export { Room, RoomAvailable } from './Room';
export { DataChange } from '@gamestdio/state-listener';
export { Auth, Platform, Device } from "./Auth";

/*
 * Serializers
 */

import { FossilDeltaSerializer } from './serializer/FossilDeltaSerializer';
import { SchemaSerializer } from "./serializer/SchemaSerializer";
import { NoneSerializer } from "./serializer/NoneSerializer";
import { registerSerializer } from './serializer/Serializer';

export { registerSerializer, FossilDeltaSerializer, SchemaSerializer };
registerSerializer('fossil-delta', FossilDeltaSerializer);
registerSerializer('schema', SchemaSerializer);
registerSerializer('none', NoneSerializer);
