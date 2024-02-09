interface ILLApiError<T> extends Error {
  response?: T;
}