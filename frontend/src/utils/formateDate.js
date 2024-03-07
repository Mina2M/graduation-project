
export const formateDate = (date, config)=>{

    const defaultOptions = {day:'numeric', month:'short', year: 'numeric'}
    const Options = config ? config : defaultOptions

    return new Date(date).toLocaleDateString('en-US', Options)
}