<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

=======
1. Change .env.example to .env
2. Restore .sql file
3. Run npm start in client folder
4. If server connection is successful, it will be written on terminal.
>>>>>>> 99127325b81f5a19e98f57852bf464667dd2e1f6
==========chnages by shreya

get worker tasks function chnaged and following added in worker view 
  const fetchTasks = () => {
    fetch(`http://localhost:5000/workers/${workerId}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Check the structure of data
        setTasks(Array.isArray(data) ? data : []); 
      })
      .catch((err) => console.error('Error fetching tasks:', err));
  };


  ==new function,earlier one had some amibiguity for issue id

  CREATE OR REPLACE FUNCTION get_worker_tasks(p_worker_id INT)
RETURNS TABLE (
    issue_id INT,
    type_name VARCHAR(100),
    location VARCHAR(255),
    description TEXT,
    status VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wt.issue_id,  -- Fully qualify column with the view alias
        wt.type_name,
        wt.location,
        wt.description,
        wt.status
    FROM worker_tasks_view wt
    WHERE wt.worker_id = p_worker_id;
END;
$$ LANGUAGE plpgsql;

==add location and issue id in frontend to show under your repoted issues?
===to update staus from admin for the issues in their dept
 CREATE OR REPLACE FUNCTION admin_update_issue_status(
  p_admin_id INTEGER,
  p_issue_id INTEGER,
  p_new_status VARCHAR
)
RETURNS TEXT AS $$
DECLARE
  admin_dept INT;
  issue_dept INT;
BEGIN
  -- Get the department of the admin
  SELECT admin_id INTO admin_dept
  FROM admin
  WHERE admin_id = p_admin_id;

  -- Get the department of the issue
  SELECT issue_type_id INTO issue_dept
  FROM issues
  WHERE issue_id = p_issue_id;

  IF admin_dept IS NULL THEN
    RETURN 'Error: Invalid admin ID.';
  ELSIF issue_dept IS NULL THEN
    RETURN 'Error: Invalid issue ID.';
  ELSIF admin_dept != issue_dept THEN
    RETURN 'Error: Admin does not have permission to update this issue.';
  END IF;

  -- Update the status
  UPDATE issues
  SET status = p_new_status
  WHERE issue_id = p_issue_id;

  RETURN 'Issue status updated successfully by admin';
END;
$$ LANGUAGE plpgsql;
CREATE FUNCTION

==added in adminview.js
        admin_id: adminId, // make sure you send the admin_id if necessary===
in handle update sttuas



==========to get dept sepcific worker,get wokers chnages ojn admin routes
CREATE OR REPLACE FUNCTION get_workers_by_issue_type(departmentId INT)
RETURNS TABLE (
  worker_id INT,
  name TEXT,
  email TEXT,
  phone TEXT,
  issue_type_id INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT worker_id, name, email, phone, issue_type_id
  FROM worker
  WHERE issue_type_id = departmentId;
END;
$$ LANGUAGE plpgsql;


========status
by default = Reported    Done
When admin assign worker = In Progress  Done by assign_task function
when worker done work ,mark complets = Completed
when admin validate it as completed(when old is completed then admin mark as resolved ) = Resolved


% -- First, create the trigger function
% CREATE OR REPLACE FUNCTION check_status_transition()
% RETURNS trigger AS $$



CREATE OR REPLACE FUNCTION check_status_transition()
RETURNS trigger AS $$
BEGIN
  -- Normalize to lowercase
  DECLARE
    old_status TEXT := LOWER(OLD.status);
    new_status TEXT := LOWER(NEW.status);
  BEGIN

    -- Define valid transitions based on simplified status flow
    IF old_status = 'reported' AND new_status NOT IN ('in progress') THEN
      RAISE EXCEPTION 'Invalid transition from % to %', OLD.status, NEW.status;

    ELSIF old_status = 'in progress' AND new_status NOT IN ('completed') THEN
      RAISE EXCEPTION 'Invalid transition from % to %', OLD.status, NEW.status;

    ELSIF old_status = 'completed' AND new_status NOT IN ('resolved') THEN
      RAISE EXCEPTION 'Invalid transition from % to %', OLD.status, NEW.status;

    ELSIF old_status = 'resolved' THEN
      RAISE EXCEPTION 'Resolved issues cannot be updated further.';
    END IF;

    -- Optional: ensure new status is from allowed set
    IF new_status NOT IN ('reported', 'in progress', 'completed', 'resolved') THEN
      RAISE EXCEPTION 'Invalid status: %. Allowed statuses: Reported, In Progress, Completed, Resolved.', NEW.status;
    END IF;

    RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS trg_check_status_transition ON issues;

CREATE TRIGGER trg_check_status_transition
BEFORE UPDATE OF status ON issues
FOR EACH ROW
EXECUTE FUNCTION check_status_transition();


===
CREATE OR REPLACE FUNCTION delete_assignment_on_resolved()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Resolved' THEN
        DELETE FROM assignment
        WHERE issue_id = NEW.issue_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS trigger_delete_assignment ON issues;

CREATE TRIGGER trigger_delete_assignment
AFTER UPDATE OF status ON issues
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION delete_assignment_on_resolved();


==========
✅ 1. Trigger Function: prevent_worker_reassignment
sql
Copy
Edit
CREATE OR REPLACE FUNCTION prevent_worker_reassignment()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM assignment WHERE worker_id = NEW.worker_id
    ) THEN
        RAISE EXCEPTION 'Worker % is already assigned to another issue', NEW.worker_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


Trigger Binding on assignment Table
sql
Copy
Edit
DROP TRIGGER IF EXISTS trigger_prevent_worker_reassignment ON assignment;

CREATE TRIGGER trigger_prevent_worker_reassignment
BEFORE INSERT ON assignment
FOR EACH ROW
EXECUTE FUNCTION prevent_worker_reassignment();