import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteSingleWork, getSingleWork } from '../../store';
import { format } from 'date-fns';

const SingleWork = () => {
  const { singleWorkDetailByEmployee } = useSelector((state) => state.work);
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSingleWork({ id }));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (
      window.confirm(
        'Do you really want to delete this work detail permanently?'
      )
    ) {
      dispatch(deleteSingleWork({ id }))
        .unwrap()
        .then(() => navigate(`/admin/work-list/${id}`))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="single"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="top">
        <div className="left-side">
          <div>
            <Link to={`/admin/daily-tasks/${id}/update`}>
              <button className="editButton button">Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              src={`https://picsum.photos/seed/${id}/300/200`}
              alt=""
              className="itemImg"
            />
            <div className="single-list__container">
              <div>
                <span className="single-list__container-item-key">
                  Work done tagline:
                </span>
                <span className="single-list__container-item-value">
                  {singleWorkDetailByEmployee.name}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">Status:</span>
                <span className="single-list__container-item-value">
                  {singleWorkDetailByEmployee.status}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">Date:</span>
                <span className="single-list__container-item-value">
                  {singleWorkDetailByEmployee?.date &&
                    format(
                      new Date(singleWorkDetailByEmployee?.date),
                      'yyyy-MM-dd'
                    )}
                </span>
              </div>
              <div>
                <span className="single-list__container-item-key">
                  Description:
                </span>
                <span
                  // className="single-list__container-item-value"
                  contentEditable={false}
                  dangerouslySetInnerHTML={{
                    __html: singleWorkDetailByEmployee.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWork;
