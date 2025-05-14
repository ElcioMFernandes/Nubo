import { docker } from "../core/docker";
import { format } from "../utils/response";

export async function containers() {
  try {
    const containers = await docker.listContainers();

    return format(containers);
  } catch (error) {
    return format(null, "fail", error);
  }
}

export async function container(id: string) {
  try {
  } catch (error) {}
}
