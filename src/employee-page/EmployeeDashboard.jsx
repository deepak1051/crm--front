import CustomerFeature from './extra/feature/CustomerFeature';
import ProjectFeature from './extra/feature/ProjectFeature';
import './styles/dashboard.scss';
import CompleteTaskWidget from './extra/widget/CompleteTaskWidget';
import CommingTaskWidget from './extra/widget/CommingTaskWidget';
import RunningTaskWidget from './extra/widget/RunningTaskWidget';

const EmployeeDashboard = () => {
  return (
    <>
      <div className="charts">
        <CustomerFeature />
        {/* <EmployeeFeature /> */}
        <ProjectFeature />
      </div>
      <div className="widgets">
        <CompleteTaskWidget />
        <RunningTaskWidget />
        <CommingTaskWidget />
      </div>
    </>
  );
};

export default EmployeeDashboard;
