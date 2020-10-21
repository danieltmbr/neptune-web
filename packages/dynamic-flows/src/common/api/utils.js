export function isStatus2xx(status) {
  return status >= 200 && status < 300;
}

export function isStatus422(status) {
  return status === 422;
}