DROP TABLE all_symp;
DROP TABLE vaccine_type;
DROP TABLE vaccine_data;
CREATE TABLE vaccine_type(VAERS_ID int ,
						 VAX_TYPE varchar(100),
						 VAX_MANU varchar(100),
						 VAX_DOSE_SERIES varchar(100),
						 VAX_ROUTE varchar(100),
						 VAX_NAME varchar(100)
);

CREATE TABLE all_symp(VAERS_ID int ,
						 symptoms varchar(100)
);

CREATE TABLE vaccine_data(vaers_id int ,
						  recvdate varchar(20), 
						  age_yrs int, 
						  sex varchar(20), 
						  died varchar(20), 
						  datedied varchar(20),
						  l_threat varchar(20), 
						  hospital varchar(20), 
						  hospdays int, 
						  recovd varchar(20), 
						  vax_date varchar(20), 
						  history varchar(10000)
);

SELECT * FROM vaccine_data
SELECT * FROM all_symp
SELECT * FROM vaccine_type