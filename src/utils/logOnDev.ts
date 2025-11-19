export const logOnDev = (message: string) => {
  if (import.meta.env.DEV) {
    console.log(message);
  }
};
