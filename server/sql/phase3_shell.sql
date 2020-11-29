/*
CS4400: Introduction to Database Systems
Fall 2020
Phase III Template

Team 60
Zhen Jiang (zjiang330)
Yihua Xu (yxu604)
Zirui Wang (zwang912)
Shuangyue Cheng (scheng82)

Directions:
Please follow all instructions from the Phase III assignment PDF.
This file must run without error for credit.
*/


-- ID: 2a
-- Author: lvossler3
-- Name: register_student
DROP PROCEDURE IF EXISTS register_student;
DELIMITER //
CREATE PROCEDURE register_student(
		IN i_username VARCHAR(40),
        IN i_email VARCHAR(40),
        IN i_fname VARCHAR(40),
        IN i_lname VARCHAR(40),
        IN i_location VARCHAR(40),
        IN i_housing_type VARCHAR(20),
        IN i_password VARCHAR(40)
)
BEGIN

-- Type solution below
create or replace view username as
select username from User;

select count(*)
into @user_exist
from username
where username = i_username;

select count(*)
into @student_exist
from student
where student_username = i_username;

if (@user_exist = 0 and @student_exist = 0)
then
insert into User (username, user_password, email, fname, lname) VALUES (i_username, MD5(i_password), i_email, i_fname, i_lname);
insert into Student (student_username, housing_type, location) VALUES (i_username, i_housing_type, i_location);
end if;
-- End of solution
END //
DELIMITER ;

-- ID: 2b
-- Author: lvossler3
-- Name: register_employee
DROP PROCEDURE IF EXISTS register_employee;
DELIMITER //
CREATE PROCEDURE register_employee(
		IN i_username VARCHAR(40),
        IN i_email VARCHAR(40),
        IN i_fname VARCHAR(40),
        IN i_lname VARCHAR(40),
        IN i_phone VARCHAR(10),
        IN i_labtech BOOLEAN,
        IN i_sitetester BOOLEAN,
        IN i_password VARCHAR(40)
)
BEGIN
-- Type solution below
create or replace view username as
select username from User;

select count(username)
into @count
from username
where username = i_username;

if (@count = 0)
then
insert into User (username, user_password, email, fname, lname) VALUES (i_username, MD5(i_password), i_email, i_fname, i_lname);
insert into employee (emp_username, phone_num) VALUES (i_username, i_phone);
	if (i_labtech)
	then insert into labtech (labtech_username) VALUES (i_username);
	end if;

	if (i_sitetester)
	then insert into sitetester (sitetester_username) VALUES (i_username);
	end if;
end if;

-- End of solution
END //
DELIMITER ;

-- ID: 4a
-- Author: Aviva Smith
-- Name: student_view_results
DROP PROCEDURE IF EXISTS `student_view_results`;
DELIMITER //
CREATE PROCEDURE `student_view_results`(
    IN i_student_username VARCHAR(50),
	IN i_test_status VARCHAR(50),
	IN i_start_date DATE,
    IN i_end_date DATE
)
BEGIN
	DROP TABLE IF EXISTS student_view_results_result;
    CREATE TABLE student_view_results_result(
        test_id VARCHAR(7),
        timeslot_date date,
        date_processed date,
        pool_status VARCHAR(40),
        test_status VARCHAR(40)
    );
    INSERT INTO student_view_results_result

    -- Type solution below

		SELECT t.test_id, t.appt_date, p.process_date, p.pool_status , t.test_status
        FROM Appointment a
            LEFT JOIN Test t
                ON t.appt_date = a.appt_date
                AND t.appt_time = a.appt_time
                AND t.appt_site = a.site_name
            LEFT JOIN Pool p
                ON t.pool_id = p.pool_id
        WHERE i_student_username = a.username
            AND (i_test_status = t.test_status OR i_test_status IS NULL)
            AND (i_start_date <= t.appt_date OR i_start_date IS NULL)
            AND (i_end_date >= t.appt_date OR i_end_date IS NULL);

    -- End of solution
END //
DELIMITER ;

-- ID: 5a
-- Author: asmith457
-- Name: explore_results
DROP PROCEDURE IF EXISTS explore_results;
DELIMITER $$
CREATE PROCEDURE explore_results (
    IN i_test_id VARCHAR(7))
BEGIN
    DROP TABLE IF EXISTS explore_results_result;
    CREATE TABLE explore_results_result(
        test_id VARCHAR(7),
        test_date date,
        timeslot time,
        testing_location VARCHAR(40),
        date_processed date,
        pooled_result VARCHAR(40),
        individual_result VARCHAR(40),
        processed_by VARCHAR(80)
    );
    INSERT INTO explore_results_result

    -- Type solution below

        select test_id, appt_date as test_date, appt_time as timeslot, appt_site as testing_location, 
		process_date as date_processed, pool_status as pooled_result, test_status as individual_result, concat(fname, " ", lname) as processed_by
		from (TEST join POOL on TEST.pool_id = POOL.pool_id) join USER on processed_by = username
		where test_id = i_test_id;

    -- End of solution
END$$
DELIMITER ;

-- ID: 6a
-- Author: asmith457
-- Name: aggregate_results
DROP PROCEDURE IF EXISTS aggregate_results;
DELIMITER $$
CREATE PROCEDURE aggregate_results(
    IN i_location VARCHAR(50),
    IN i_housing VARCHAR(50),
    IN i_testing_site VARCHAR(50),
    IN i_start_date DATE,
    IN i_end_date DATE)
BEGIN
    DROP TABLE IF EXISTS aggregate_results_result;
    CREATE TABLE aggregate_results_result(
        test_status VARCHAR(40),
        num_of_test INT,
        percentage DECIMAL(6,2)
    );

    INSERT INTO aggregate_results_result

    -- Type solution below

		select t.test_status as test_status, count(*) as num_of_test, round(count(*) * 100 / (select count(*) from test t
        join appointment a on (t.appt_date = a.appt_date and t.appt_time = a.appt_time and t.appt_site = a.site_name)
        join student on a.username = student.student_username
        join pool on t.pool_id = pool.pool_id
        where (student.location = i_location OR i_location is NULL)
                        AND (student.housing_type = i_housing OR i_housing is NULL)
                        AND (a.site_name = i_testing_site OR i_testing_site is NULL)
                        AND (i_start_date <= pool.process_date OR i_start_date IS NULL)
                        AND (i_end_date >= pool.process_date OR i_end_date IS NULL)
            AND pool.process_date is not null), 2) as percentage
        from test t
        join appointment a on (t.appt_date = a.appt_date and t.appt_time = a.appt_time and t.appt_site = a.site_name)
        join student on a.username = student.student_username
        join pool on t.pool_id = pool.pool_id
        where (student.location = i_location OR i_location is NULL)
                        AND (student.housing_type = i_housing OR i_housing is NULL)
                        AND (a.site_name = i_testing_site OR i_testing_site is NULL)
                        AND (i_start_date <= pool.process_date OR i_start_date IS NULL)
                        AND (i_end_date >= pool.process_date OR i_end_date IS NULL)
        group by t.test_status
    union
        select t.test_status as test_status, count(*) as num_of_test, round(count(*) * 100 / (select count(*) from test t
        join appointment a on (t.appt_date = a.appt_date and t.appt_time = a.appt_time and t.appt_site = a.site_name)
        join student on a.username = student.student_username
        join pool on t.pool_id = pool.pool_id
        where t.test_status = 'pending'
                        AND ((i_end_date IS NULL AND process_date IS NULL AND i_start_date IS NOT NULL and (student.location = i_location OR i_location is NULL)
            and (student.housing_type = i_housing OR i_housing is NULL)
            and (a.site_name = i_testing_site OR i_testing_site is NULL))
            OR (i_end_date IS NOT NULL AND process_date IS NOT NULL and (student.location = i_location OR i_location is NULL)
            and (student.housing_type = i_housing OR i_housing is NULL)
            and (a.site_name = i_testing_site OR i_testing_site is NULL)))), 2) as percentage
        from test t
        join appointment a on (t.appt_date = a.appt_date and t.appt_time = a.appt_time and t.appt_site = a.site_name)
        join student on a.username = student.student_username
        join pool on t.pool_id = pool.pool_id
        where t.test_status = 'pending'
                        AND ((i_end_date IS NULL AND process_date IS NULL AND i_start_date IS NOT NULL and (student.location = i_location OR i_location is NULL)
            and (student.housing_type = i_housing OR i_housing is NULL)
            and (a.site_name = i_testing_site OR i_testing_site is NULL))
            OR (i_end_date IS NOT NULL AND process_date IS NOT NULL and (student.location = i_location OR i_location is NULL)
            and (student.housing_type = i_housing OR i_housing is NULL)
            and (a.site_name = i_testing_site OR i_testing_site is NULL)))
        group by t.test_status;


    -- End of solution
END$$
DELIMITER ;


-- ID: 7a
-- Author: lvossler3
-- Name: test_sign_up_filter
DROP PROCEDURE IF EXISTS test_sign_up_filter;
DELIMITER //
CREATE PROCEDURE test_sign_up_filter(
    IN i_username VARCHAR(40),
    IN i_testing_site VARCHAR(40),
    IN i_start_date date,
    IN i_end_date date,
    IN i_start_time time,
    IN i_end_time time)
BEGIN
    DROP TABLE IF EXISTS test_sign_up_filter_result;
    CREATE TABLE test_sign_up_filter_result(
        appt_date date,
        appt_time time,
        street VARCHAR (40),
        city VARCHAR(40),
        state VARCHAR(2),
        zip VARCHAR(5),
        site_name VARCHAR(40));
    INSERT INTO test_sign_up_filter_result

    -- Type solution below

	select appt_date, appt_time, street, city, state, zip, s.site_name
	from (APPOINTMENT a join SITE s on a.site_name = s.site_name) join student on s.location = student.location 
	where student_username = i_username and a.username is null
		AND (i_testing_site = a.site_name OR i_testing_site is NULL)
		AND (i_start_date <= a.appt_date OR i_start_date IS NULL)
		AND (i_end_date >= a.appt_date OR i_end_date IS NULL)
		AND (i_start_time <= a.appt_time OR i_start_time IS NULL)
		AND (i_end_time >= a.appt_time OR i_end_time IS NULL);

    -- End of solution

    END //
    DELIMITER ;

-- ID: 7b
-- Author: lvossler3
-- Name: test_sign_up
DROP PROCEDURE IF EXISTS test_sign_up;
DELIMITER //
CREATE PROCEDURE test_sign_up(
		IN i_username VARCHAR(40),
        IN i_site_name VARCHAR(40),
        IN i_appt_date date,
        IN i_appt_time time,
        IN i_test_id VARCHAR(7)
)
BEGIN

-- Type solution below
select username
into @user_name
from appointment
where site_name = i_site_name and appt_date = i_appt_date and appt_time = i_appt_time;

if (@user_name is null)
then 
select count(*)
into @numOfPending
from appointment a join test t on a.site_name = t.appt_site and a.appt_date = t.appt_date and a.appt_time = t.appt_time
where username = i_username and test_status = "pending";

if (@numOfPending = 0)
then 
insert into test (test_id, test_status, pool_id, appt_site, appt_date, appt_time) VALUES (i_test_id, "pending", NULL, i_site_name, i_appt_date, i_appt_time);
update appointment set username = i_username
where appt_date = i_appt_date and appt_time = i_appt_time and site_name = i_site_name;
end if;
end if;




-- End of solution
END //
DELIMITER ;

-- Number: 8a
-- Author: lvossler3
-- Name: tests_processed
DROP PROCEDURE IF EXISTS tests_processed;
DELIMITER //
CREATE PROCEDURE tests_processed(
    IN i_start_date date,
    IN i_end_date date,
    IN i_test_status VARCHAR(10),
    IN i_lab_tech_username VARCHAR(40))
BEGIN
    DROP TABLE IF EXISTS tests_processed_result;
    CREATE TABLE tests_processed_result(
        test_id VARCHAR(7),
        pool_id VARCHAR(10),
        test_date date,
        process_date date,
        test_status VARCHAR(10) );
    INSERT INTO tests_processed_result
    -- Type solution below

	select t.test_id as test_id, p.pool_id as pool_id, t.appt_date as test_date,
	p.process_date as process_date, t.test_status as test_status
	from test t join pool p on t.pool_id = p.pool_id
	where (processed_by = i_lab_tech_username) 
		AND (t.test_status = i_test_status OR i_test_status IS NULL)
		AND (i_start_date <= t.appt_date OR i_start_date IS NULL)
		AND (i_end_date >= t.appt_date OR i_end_date IS NULL);

    -- End of solution
    END //
    DELIMITER ;

-- ID: 9a
-- Author: ahatcher8@
-- Name: view_pools
DROP PROCEDURE IF EXISTS view_pools;
DELIMITER //
CREATE PROCEDURE view_pools(
    IN i_begin_process_date DATE,
    IN i_end_process_date DATE,
    IN i_pool_status VARCHAR(20),
    IN i_processed_by VARCHAR(40)
)
BEGIN
    DROP TABLE IF EXISTS view_pools_result;
    CREATE TABLE view_pools_result(
        pool_id VARCHAR(10),
        test_ids VARCHAR(100),
        date_processed DATE,
        processed_by VARCHAR(40),
        pool_status VARCHAR(20));
	INSERT INTO view_pools_result
-- Type solution below

select pool.pool_id, group_concat(test_id separator ",") as test_ids, process_date, processed_by, pool_status
from pool join test on pool.pool_id = test.pool_id
where (i_pool_status is NULL or pool_status = i_pool_status) and (i_processed_by is NULL or processed_by = i_processed_by)
		and (i_end_process_date is NULL or process_date <= i_end_process_date)
        and (i_begin_process_date is NULL or process_date >= i_begin_process_date)
group by pool.pool_id
union
select pool.pool_id, group_concat(test_id separator ",") as test_ids, process_date, processed_by, pool_status
from pool join test on pool.pool_id = test.pool_id
where pool_status = "pending" and 
		((i_end_process_date is NULL and i_processed_by is NULL and i_pool_status is NULL and process_date is NULL) or (i_end_process_date is not NULL and process_date is not NULL))
group by pool.pool_id;
-- End of solution
END //
DELIMITER ;

-- ID: 10a
-- Author: ahatcher8@
-- Name: create_pool
DROP PROCEDURE IF EXISTS create_pool;
DELIMITER //
CREATE PROCEDURE create_pool(
	IN i_pool_id VARCHAR(10),
    IN i_test_id VARCHAR(7)
)
BEGIN
-- Type solution below
select count(*)
into @pool_exist
from pool
where pool_id = i_pool_id;

select count(*)
into @test_exist
from test
where test_id = i_test_id and pool_id is null;

if (@pool_exist = 0 and @test_exist = 1)
then 
insert into pool (pool_id, pool_status, process_date, processed_by) VALUES (i_pool_id, "pending", null, null);
update test set pool_id = i_pool_id
where test_id = i_test_id;
end if;

-- End of solution
END //
DELIMITER ;

-- ID: 10b
-- Author: ahatcher8@
-- Name: assign_test_to_pool
DROP PROCEDURE IF EXISTS assign_test_to_pool;
DELIMITER //
CREATE PROCEDURE assign_test_to_pool(
    IN i_pool_id VARCHAR(10),
    IN i_test_id VARCHAR(7)
)
BEGIN
-- Type solution below
select count(*)
into @pool_exist
from pool
where pool_id = i_pool_id;

select count(*)
into @test_exist
from test
where test_id = i_test_id;

select count(*)
into @test_num
from test join pool on test.pool_id = pool.pool_id
where pool.pool_id = i_pool_id;

if (@pool_exist = "1" and @test_exist = "1" and @test_num < 7) 
then
update test set pool_id = i_pool_id 
where test_id = i_test_id and test.pool_id is null;
end if;

-- End of solution
END //
DELIMITER ;

-- ID: 11a
-- Author: ahatcher8@
-- Name: process_pool
DROP PROCEDURE IF EXISTS process_pool;
DELIMITER //
CREATE PROCEDURE process_pool(
    IN i_pool_id VARCHAR(10),
    IN i_pool_status VARCHAR(20),
    IN i_process_date DATE,
    IN i_processed_by VARCHAR(40)
)
BEGIN
-- Type solution below

    SELECT pool_status
    INTO @curr_status
    FROM POOL
    WHERE pool_id = i_pool_id;
    
    select count(*)
    into @lab_tech_exist
    from labtech
    where labtech_username = i_processed_by;
    
    select count(*)
    into @pool_exist
    from pool
    where pool_id = i_pool_id;

    IF
        ((@curr_status = 'pending') AND (i_pool_status = 'positive' OR i_pool_status = 'negative') 
			and @lab_tech_exist = 1 and @pool_exist = 1)
    THEN
        UPDATE POOL
        SET pool_status = i_pool_status, process_date = i_process_date, processed_by = i_processed_by
        WHERE pool_id = i_pool_id;
    END IF;


-- End of solution
END //
DELIMITER ;

-- ID: 11b
-- Author: ahatcher8@
-- Name: process_test
DROP PROCEDURE IF EXISTS process_test;
DELIMITER //
CREATE PROCEDURE process_test(
    IN i_test_id VARCHAR(7),
    IN i_test_status VARCHAR(20)
)
BEGIN
-- Type solution below
select count(*)
into @test_exist
from test
where test_id = i_test_id;

select count(*)
into @pool_pending
from test join pool on test.pool_id = pool.pool_id
where test_id = i_test_id and pool_status = "pending";

select count(*)
into @pool_negative
from test join pool on test.pool_id = pool.pool_id
where test_id = i_test_id and pool_status = "negative";

select i_test_status = "positive"
into @is_positive;

select i_test_status = "negative"
into @is_negative;

select count(*)
into @test_not_process
from test
where test_id = i_test_id and test_status = "pending";

if (@test_exist = 1 and @pool_pending = 0 
	and (@pool_negative = 0 or i_test_status = "negative") and (@is_positive = 1 or @is_negative = 1) and @test_not_process = 1)
then update test set test.test_status = i_test_status
where test_id = i_test_id;
end if;

-- End of solution
END //
DELIMITER ;

-- ID: 12a
-- Author: dvaidyanathan6
-- Name: create_appointment

DROP PROCEDURE IF EXISTS create_appointment;
DELIMITER //
CREATE PROCEDURE create_appointment(
	IN i_site_name VARCHAR(40),
    IN i_date DATE,
    IN i_time TIME
)
BEGIN
-- Type solution below
select count(*) * 10 
into @numAppts
from working_at
where site = i_site_name;

select count(*)
into @appt_exist
from appointment
where site_name = i_site_name and appt_date = i_date;

select count(*)
into @if_appt_exist
from appointment
where site_name = i_site_name and appt_date = i_date and appt_time = i_time;

if (@appt_exist < @numAppts and @if_appt_exist = 0)
then
insert into appointment (username, site_name, appt_date, appt_time) VALUES (null, i_site_name, i_date, i_time);
end if;

-- End of solution
END //
DELIMITER ;

-- ID: 13a
-- Author: dvaidyanathan6@
-- Name: view_appointments
DROP PROCEDURE IF EXISTS view_appointments;
DELIMITER //
CREATE PROCEDURE view_appointments(
    IN i_site_name VARCHAR(40),
    IN i_begin_appt_date DATE,
    IN i_end_appt_date DATE,
    IN i_begin_appt_time TIME,
    IN i_end_appt_time TIME,
    IN i_is_available INT  -- 0 for "booked only", 1 for "available only", NULL for "all"
)
BEGIN
    DROP TABLE IF EXISTS view_appointments_result;
    CREATE TABLE view_appointments_result(

        appt_date DATE,
        appt_time TIME,
        site_name VARCHAR(40),
        location VARCHAR(40),
        username VARCHAR(40));

    INSERT INTO view_appointments_result
-- Type solution below

    select a.appt_date as appt_date, a.appt_time as appt_time, a.site_name as site_name,
		s.location as location, a.username as username
	from appointment a join site s on a.site_name = s.site_name
	where (a.site_name = i_site_name or i_site_name is null)
		AND (i_begin_appt_date <= a.appt_date OR i_begin_appt_date IS NULL)
		AND (i_end_appt_date >= a.appt_date OR i_end_appt_date IS NULL)
		AND (i_begin_appt_time <= a.appt_time OR i_begin_appt_time IS NULL)
		AND (i_end_appt_time >= a.appt_time OR i_end_appt_time IS NULL)
        AND (isnull(a.username) = i_is_available or i_is_available is null);

-- End of solution
END //
DELIMITER ;


-- ID: 14a
-- Author: kachtani3@
-- Name: view_testers
DROP PROCEDURE IF EXISTS view_testers;
DELIMITER //
CREATE PROCEDURE view_testers()
BEGIN
    DROP TABLE IF EXISTS view_testers_result;
    CREATE TABLE view_testers_result(

        username VARCHAR(40),
        name VARCHAR(80),
        phone_number VARCHAR(10),
        assigned_sites VARCHAR(255));

    INSERT INTO view_testers_result
-- Type solution below

select sitetester_username as username, concat(fname, " ", lname) as name, phone_num as phone_number, group_concat(site separator ",") as assigned_sites
from ((sitetester join working_at on sitetester_username = working_at.username) join user on sitetester_username = user.username) join employee on sitetester_username = emp_username
group by sitetester_username
union
select sitetester_username as username, concat(fname, " ", lname) as name, phone_num as phone_number, null
from ((sitetester left outer join working_at on sitetester_username = working_at.username) join user on sitetester_username = user.username) join employee on sitetester_username = emp_username
where site is null;

-- End of solution
END //
DELIMITER ;

-- ID: 15a
-- Author: kachtani3@
-- Name: create_testing_site
DROP PROCEDURE IF EXISTS create_testing_site;
DELIMITER //
CREATE PROCEDURE create_testing_site(
	IN i_site_name VARCHAR(40),
    IN i_street varchar(40),
    IN i_city varchar(40),
    IN i_state char(2),
    IN i_zip char(5),
    IN i_location varchar(40),
    IN i_first_tester_username varchar(40)
)
BEGIN
-- Type solution below
select count(*)
into @site_exist
from site
where site_name = i_site_name;

select count(*)
into @user_exist
from user
where username = i_first_tester_username;

if (@site_exist = 0 and @user_exist = 1)
then
insert into site (site_name, street, city, state, zip, location) VALUES (i_site_name, i_street, i_city, i_state, i_zip, i_location);
insert into working_at (username, site) VALUES (i_first_tester_username, i_site_name);
end if;

-- End of solution
END //
DELIMITER ;

-- ID: 16a
-- Author: kachtani3@
-- Name: pool_metadata
DROP PROCEDURE IF EXISTS pool_metadata;
DELIMITER //
CREATE PROCEDURE pool_metadata(
    IN i_pool_id VARCHAR(10))
BEGIN
    DROP TABLE IF EXISTS pool_metadata_result;
    CREATE TABLE pool_metadata_result(
        pool_id VARCHAR(10),
        date_processed DATE,
        pooled_result VARCHAR(20),
        processed_by VARCHAR(100));

    INSERT INTO pool_metadata_result
-- Type solution below

    select pool_id, process_date as date_processed, 
	pool_status as pool_result, concat(user.fname, " ", user.lname) as processed_by
	from pool join user on pool.processed_by = user.username 
	where pool_id = i_pool_id;

-- End of solution
END //
DELIMITER ;

-- ID: 16b
-- Author: kachtani3@
-- Name: tests_in_pool
DROP PROCEDURE IF EXISTS tests_in_pool;
DELIMITER //
CREATE PROCEDURE tests_in_pool(
    IN i_pool_id VARCHAR(10))
BEGIN
    DROP TABLE IF EXISTS tests_in_pool_result;
    CREATE TABLE tests_in_pool_result(
        test_id varchar(7),
        date_tested DATE,
        testing_site VARCHAR(40),
        test_result VARCHAR(20));

    INSERT INTO tests_in_pool_result
-- Type solution below

    select t.test_id as test_id, t.appt_date as date_tested, t.appt_site as testing_site, t.test_status as test_result
	from pool p join test t on p.pool_id = t.pool_id
	where p.pool_id = i_pool_id;

-- End of solution
END //
DELIMITER ;

-- ID: 17a
-- Author: kachtani3@
-- Name: tester_assigned_sites
DROP PROCEDURE IF EXISTS tester_assigned_sites;
DELIMITER //
CREATE PROCEDURE tester_assigned_sites(
    IN i_tester_username VARCHAR(40))
BEGIN
    DROP TABLE IF EXISTS tester_assigned_sites_result;
    CREATE TABLE tester_assigned_sites_result(
        site_name VARCHAR(40));

    INSERT INTO tester_assigned_sites_result
-- Type solution below

 	select site as site_name
	from working_at
	where username = i_tester_username;

-- End of solution
END //
DELIMITER ;

-- ID: 17b
-- Author: kachtani3@
-- Name: assign_tester
DROP PROCEDURE IF EXISTS assign_tester;
DELIMITER //
CREATE PROCEDURE assign_tester(
	IN i_tester_username VARCHAR(40),
    IN i_site_name VARCHAR(40)
)
BEGIN
-- Type solution below
select count(*)
into @user_exist
from user
where username = i_tester_username;

select count(*)
into @site_exist
from site
where site_name = i_site_name;

select count(*)
into @working_at_exist
from working_at
where username = i_tester_username and site = i_site_name;

if (@user_exist = 1 and @site_exist = 1 and @working_at_exist = 0)
then
insert into working_at (username, site) VALUES (i_tester_username, i_site_name);
end if;


-- End of solution
END //
DELIMITER ;


-- ID: 17c
-- Author: kachtani3@
-- Name: unassign_tester
DROP PROCEDURE IF EXISTS unassign_tester;
DELIMITER //
CREATE PROCEDURE unassign_tester(
	IN i_tester_username VARCHAR(40),
    IN i_site_name VARCHAR(40)
)
BEGIN
-- Type solution below
select count(*)
into @numTesters
from working_at
where i_site_name = site;

select count(*)
into @user_exist
from user
where username = i_tester_username;

select count(*)
into @site_exist
from site
where site_name = i_site_name;

select count(*)
into @working_at_exist
from working_at
where username = i_tester_username and site = i_site_name;

if (@numTesters >= 2 and @user_exist = 1 and @site_exist = 1 and @working_at_exist = 1)
then
delete from working_at 
where username = i_tester_username and site = i_site_name;
end if;

-- End of solution
END //
DELIMITER ;


-- ID: 18a
-- Author: lvossler3
-- Name: daily_results
DROP PROCEDURE IF EXISTS daily_results;
DELIMITER //
CREATE PROCEDURE daily_results()
BEGIN
	DROP TABLE IF EXISTS daily_results_result;
    CREATE TABLE daily_results_result(
		process_date date,
        num_tests int,
        pos_tests int,
        pos_percent DECIMAL(6,2));
	INSERT INTO daily_results_result
    -- Type solution below

	select process_date, count(*) as num_tests, count(if(test.test_status="Positive", 1, null)) as pos_tests,
	round(count(if(test.test_status="Positive", 1, null)) * 100 / count(*), 2) as pos_percent
	from test join pool on test.pool_id = pool.pool_id
	where process_date is not NULL
	group by pool.process_date;

    -- End of solution
    END //
    DELIMITER ;
    
-- function: get login status
DROP FUNCTION IF EXISTS login_status;
DELIMITER //
CREATE FUNCTION login_status(
		i_username VARCHAR(40),
        i_password VARCHAR(40)
)
RETURNS VARCHAR(40)
DETERMINISTIC
BEGIN
-- Type solution below
select count(*)
into @user_exist
from user
where username = i_username and  user_password = i_password;

select count(*)
into @labtech_exist
from labtech
where labtech_username = i_username;

select count(*)
into @tester_exist
from sitetester
where sitetester_username = i_username;

select count(*)
into @admin_exist
from administrator
where admin_username = i_username;

select count(*)
into @student_exist
from student
where student_username = i_username;

if (@user_exist = 1)
then 
	if (@labtech_exist = 1 and @tester_exist = 1)
	then return "labtech/tester";
	elseif (@labtech_exist = 1)
    then return "labtech";
    elseif (@tester_exist = 1)
    then return "tester";
    elseif (@admin_exist = 1)
    then return "admin";
    elseif (@student_exist = 1)
    then return "student";
    else return "invalid user type";
    end if;
end if;
return "invalid username/password";
-- End of solution
END //
DELIMITER ;




















