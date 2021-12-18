export const dateStrToDate = (dateStr: string) : string=>{
        const dateConvStr = dateStr.split('/')
        .reverse().join('-');
        const date = dateConvStr + " 00:00:00"
        
        return date
    }
