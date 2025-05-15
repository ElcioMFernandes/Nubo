import { docker } from "../core/docker";
import { format } from "../utils/response";
import { demultiplex } from "../utils/demultiplex";
import { default_view } from "../views/default";

export async function containers_controller(view: string = "default") {
  try {
    const containers = await docker.listContainers();

    switch (view) {
      case "raw":
        return format(containers);
      default:
        return format(default_view(containers));
    }
  } catch (error) {
    return format(null, "fail", error);
  }
}

export async function container_controller(
  id: string,
  view: string = "default"
) {
  try {
    const container = await docker.getContainer(id).inspect();

    switch (view) {
      case "raw":
        return format(container);
      default:
        return format(default_view(container));
    }
  } catch (error) {
    return format(null, "fail", error);
  }
}

export async function logs_controller(id: string) {
  try {
    const container = docker.getContainer(id);

    const logs: Buffer = await new Promise((resolve, reject) => {
      container.logs(
        {
          stdout: true,
          stderr: true,
          follow: false,
          tail: 100,
          timestamps: true,
        },
        (err, data?: Buffer) => {
          if (err) return reject(err);
          if (!data) return resolve(Buffer.from(""));
          resolve(data);
        }
      );
    });

    const { stdout, stderr } = demultiplex(logs);

    return format({ stdout, stderr });
  } catch (error) {
    return format(null, "fail", error);
  }
}
