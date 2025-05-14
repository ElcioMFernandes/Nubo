export function format(
  data: any,
  status: "success" | "fail" = "success",
  detail: any = null
) {
  return {
    status,
    detail,
    timestamp: Math.floor(Date.now() / 1000),
    data,
  };
}
