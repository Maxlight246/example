export class HandleDateTime{
    static DateString = (num: number) =>{
      const date = new Date(num);

      return `${date.getDate()}/${date.getMonth() + 1}`
    }

    static GetHour = (num: number) =>{
        const date = new Date(num);

        return `${date.getHours()}`
    }
}