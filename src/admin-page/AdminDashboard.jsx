import CustomerFeature from '../extra/feature/CustomerFeature';
import EmployeeFeature from '../extra/feature/EmployeeFeature';
import ProjectFeature from '../extra/feature/ProjectFeature';

import CompletedWidget from '../extra/widget/CompletedWidget';
import CommingWidget from '../extra/widget/CommingWidget';
import RunningWidget from '../extra/widget/RunningWidget';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { tasks } = useSelector((state) => state.admin);
  console.log(tasks);
  return (
    <>
      <div className="charts">
        <CustomerFeature />
        <EmployeeFeature />
        <ProjectFeature />
        {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
      </div>
      <div className="widgets">
        <CompletedWidget />
        <RunningWidget />
        <CommingWidget />
        {/* <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" /> */}
      </div>
    </>
  );
};

export default AdminDashboard;
