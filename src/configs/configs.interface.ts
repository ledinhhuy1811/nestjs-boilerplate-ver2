export interface ConfigsInterface {
  // environment
  env: string;
  port: number;

  // rpc
  rpc: {
    orai: string;
  };

  // database
  database: {
    url: string;
  };
}
