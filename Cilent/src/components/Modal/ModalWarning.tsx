
interface Props {
    closeModalWarning: ()=> void
}

export default function ({closeModalWarning} : Props) {

  return (
    <>
      {/* Modal cảnh báo lỗi */}
      <div className="overlay">
        <div className="modal-custom">
          <div className="modal-header-custom">
            <h1 className="text-2xl text-red-500">Cảnh báo</h1>
            <i onClick={closeModalWarning} className="fas fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <p>Tên công việc không được phép để trống hoặc trùng nhau.</p>
          </div>
          <div className="modal-footer-footer">
            <button onClick={closeModalWarning} className="btn btn-light">Đóng</button>
          </div>
        </div>
      </div>
    </>
  );
}
