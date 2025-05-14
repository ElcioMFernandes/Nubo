import Docker from "dockerode";
import { env } from "../configs/env";

export const docker = new Docker({
  socketPath: env.SOCKET_PATH,
});
