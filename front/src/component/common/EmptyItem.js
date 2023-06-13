import "./EmptyItem.css";

const EmptyItem = () => {
    return (
        <div className="EmptyItem">
            <div className="guideBox">
                <table className="nes-table is-bordered is-dark">
                    <thead>
                    <tr>
                        <th>상태창</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr style={{height:"180px"}}>
                        <td style={{display:"flex", justifyContent:"center",fontSize:"2em",padding:"100px"}}>
                            <div style={{display:"flex",marginBottom:"100px"}} className="nes-balloon from-right is-dark">
                                <p>내용이 존재하지 않습니다</p>
                            </div>
                            <i style={{display:"flex",marginTop:"80px"}} className="nes-pokeball"></i>
                        </td>
                    </tr>
                    <tr style={{height: "180px",fontSize:"3em"}}>
                        <td><span style={{marginLeft: "10px"}}>아무래도 내용이 비어있는 듯 하다...</span></td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default EmptyItem;