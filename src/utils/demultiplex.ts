export function demultiplex(buffer: Buffer) {
  const stdoutChunks: Buffer[] = [];
  const stderrChunks: Buffer[] = [];
  let i = 0;
  while (i + 8 <= buffer.length) {
    const type = buffer[i];
    const payloadLength = buffer.readUInt32BE(i + 4);
    const payload = buffer.slice(i + 8, i + 8 + payloadLength);
    if (type === 1) stdoutChunks.push(payload);
    else if (type === 2) stderrChunks.push(payload);
    i += 8 + payloadLength;
  }
  return {
    stdout: Buffer.concat(stdoutChunks).toString("utf-8").split("\n"),
    stderr: Buffer.concat(stderrChunks).toString("utf-8").split("\n"),
  };
}
