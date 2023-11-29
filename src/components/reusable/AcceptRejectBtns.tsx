import Button from "./Button"




const AcceptRejectBtns = ({accept, reject, condtion}: {accept: Function, reject: Function, condtion?: boolean}) => {


    return(<div className="flex gap-4 mx-auto justify-center my-2 flex-wrap">
    <Button disabled={condtion} onClick={() => accept()} variant="accept">Update</Button>
    <Button onClick={() => reject()} variant="reject">Cancel</Button>
</div>)
}


export default AcceptRejectBtns