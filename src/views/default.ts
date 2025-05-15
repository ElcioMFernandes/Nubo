export function default_view(raw: any) {
  const basic = (c: any) => ({
    id: c.Id,
    name: c.Name,
    image: c.Image,
    state: c.State?.Status,
    restartCount: c.RestartCount,
    privileged: c.HostConfig?.Privileged,
    memory: c.HostConfig?.Memory,
    ports: c.NetworkSettings?.Ports,
  });

  if (!raw) return null;

  if (Array.isArray(raw)) {
    return raw.map((c) => basic(c));
  } else {
    return basic(raw);
  }
}
