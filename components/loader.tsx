import "./loader.css";
export function Loader() {
    return <div className="spinner-square fixed" style={{top: "50%"}}>
    <div className="square-1 square"></div>
    <div className="square-2 square"></div>
    <div className="square-3 square"></div>
</div>
}