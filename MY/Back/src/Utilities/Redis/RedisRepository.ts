import redis from "redis";
import OperationResult from "../../core/Operation/OperationResult";

export class RedisManager {

  client: any;

    /*******
     * Set Value on Redis
     *  ******/
     async Set(key: string, value: any): Promise<OperationResult<boolean>> {
      try {
          this.client.set(key, JSON.stringify(value));
          return OperationResult.BuildSuccessResult('Operation Success', true);
      }
      catch (err:any) {
          return OperationResult.BuildFailur(err.message);
      }
  }

  async SetValueWithexiperationTime(key: string, value: any, time: number): Promise<OperationResult<boolean>> {
    try {
        this.client.setex(key, time, JSON.stringify(value));
        return OperationResult.BuildSuccessResult('Operation Success', true);
    }
    catch (err:any) {
        return OperationResult.BuildFailur(err.message);
    }
}


    /*******
     * Get Value in Redis
     *  ******/
    async Get<TValue>(key: string): Promise<OperationResult<TValue>> {
        try {
          return new Promise((resolve, reject) => {
                this.client.get(key, async (err:any, data:any) => {
                    if (err) reject(OperationResult.BuildFailur(err.message));
                    resolve(OperationResult.BuildSuccessResult('Operation Success', JSON.parse(data as string)));
                });
            });
        } catch (error:any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

  /*******
     * Remove Value on Redis
     *  ******/
   async Remove(key: string): Promise<OperationResult<boolean>> {
    try {
        this.client.del(key);
        return OperationResult.BuildSuccessResult('success Operation', true);
    } catch (error:any) {
        return OperationResult.BuildFailur(error.message);
    }
}

  ResetSingleItem<T>(key: string, value: any): Promise<boolean> {
    return new Promise(async (reject, resolve) => {
      try {
        await this.client.del(key);
        await this.Set(key, value);
        resolve(true);
      } catch (error:any) {
        reject(error);
      }
    })

  }

  Connet() {
    this.client = redis.createClient(6379, "127.0.0.1");

    this.client.on("connect", function () {
      console.log("Redis client connected");
    });
  }
}

export default new RedisManager();
