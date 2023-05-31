import CustomerFeature from '../extra/feature/CustomerFeature';
import EmployeeFeature from '../extra/feature/EmployeeFeature';
import ProjectFeature from '../extra/feature/ProjectFeature';

import CompletedWidget from '../extra/widget/CompletedWidget';
import CommingWidget from '../extra/widget/CommingWidget';
import RunningWidget from '../extra/widget/RunningWidget';

const AdminDashboard = () => {
  return (
    <>
      <div className="charts">
        <CustomerFeature />
        <EmployeeFeature />
        <ProjectFeature />
      </div>
      <div className="widgets">
        <CompletedWidget />
        <RunningWidget />
        <CommingWidget />
      </div>
    </>
  );
};

export default AdminDashboard;
