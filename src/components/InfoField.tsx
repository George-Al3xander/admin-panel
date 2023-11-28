const InfoField = ({title, data} : {title: string, data: string | number}) => {
    
    return <div className="border-b-2 flex gap-4 py-2 flex-wrap">
        <h3 className="font-bold capitalize">{title}: </h3>
        <span>{data}</span>
    </div>

}

export default InfoField