import { Diagram } from "./Diagram";

export function Statistics() {
  return (
    <>
      <div>
        <div style={{ textAlign: "center" }}>
          <h2>Выбор недели.</h2>
        </div>
      </div>
      <hr />
      <div>
        <div style={{ textAlign: "center" }}>
          <Diagram />
        </div>
      </div>
      <hr />
    </>
  );
}
