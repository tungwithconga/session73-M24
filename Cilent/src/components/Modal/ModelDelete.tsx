interface Props {
  ConfirmDelete: () => void;
  closeModalDelete: () => void;
}

export default function ModelDelete({
  ConfirmDelete,
  closeModalDelete,
}: Props) {
  return (
    <>
      {/* Modal xác nhận xóa */}
      <div className="overlay">
        <div className="modal-custom">
          <div className="modal-header-custom">
            <h5 className="text-2xl text-green-400">Xác nhận</h5>
            <i className="fas fa-xmark" onClick={closeModalDelete} />
          </div>
          <div className="modal-body-custom">
            <p>Bạn chắc chắn muốn xóa công việc này?</p>
          </div>
          <div className="modal-footer-footer">
            <button onClick={closeModalDelete} className="btn btn-light">
              Hủy
            </button>
            <button onClick={ConfirmDelete} className="btn btn-danger">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
