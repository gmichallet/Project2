--Join on the vaccine_data and all_symp tables
SELECT d.vaers_id, d.age_yrs, d.sex, s.symptoms, d.died FROM vaccine_data d
INNER JOIN all_symp s
ON d.vaers_id = s.vaers_id


--Selects ages >18
SELECT d.vaers_id, d.age_yrs, d.sex, s.symptoms, d.history, d.l_threat, d.died FROM vaccine_data d
INNER JOIN all_symp s
ON d.vaers_id = s.vaers_id
WHERE d.age_yrs < 18

--Selects ages 18-35
SELECT d.vaers_id, d.age_yrs, d.sex, s.symptoms, d.history, d.l_threat, d.died FROM vaccine_data d
INNER JOIN all_symp s
ON d.vaers_id = s.vaers_id
WHERE d.age_yrs >= 18
AND d.age_yrs <=35

--Selects ages 36-50
SELECT d.vaers_id, d.age_yrs, d.sex, s.symptoms, d.history, d.l_threat, d.died FROM vaccine_data d
INNER JOIN all_symp s
ON d.vaers_id = s.vaers_id
WHERE d.age_yrs >= 36
AND d.age_yrs <=50

--Selects ages 51-75
SELECT d.vaers_id, d.age_yrs, d.sex, s.symptoms, d.history, d.l_threat, d.died FROM vaccine_data d
INNER JOIN all_symp s
ON d.vaers_id = s.vaers_id
WHERE d.age_yrs >= 51
AND d.age_yrs <=75

--Selects ages 75+
SELECT d.vaers_id, d.age_yrs, d.sex, s.symptoms, d.l_threat, d.died FROM vaccine_data d
INNER JOIN all_symp s
ON d.vaers_id = s.vaers_id
WHERE  d.age_yrs > 75

--Selects where patients died
SELECT d.vaers_id, d.age_yrs, d.sex, s.symptoms, d.history, d.died FROM vaccine_data d
INNER JOIN all_symp s
ON d.vaers_id = s.vaers_id
WHERE  d.died = 'Y'

--Selects the number of deaths by sex
SELECT d.sex, COUNT(d.died) as number_of_deaths FROM vaccine_data d
INNER JOIN all_symp s
ON d.vaers_id = s.vaers_id
WHERE  d.died = 'Y'
GROUP BY d.sex

--Selects the number of deaths by symptom in descsending order
SELECT s.symptoms, COUNT(d.died) as number_of_deaths FROM vaccine_data d
INNER JOIN all_symp s
ON d.vaers_id = s.vaers_id
WHERE  d.died = 'Y'
GROUP BY s.symptoms
ORDER BY number_of_deaths DESC

--Selects the number of deaths by vaccine_type
SELECT vt.vax_manu, COUNT(d.died) as number_of_deaths FROM vaccine_data d
INNER JOIN vaccine_type vt
ON d.vaers_id = vt.vaers_id
WHERE  d.died = 'Y'
GROUP BY vt.vax_manu
ORDER BY number_of_deaths DESC

--Selects the number of deaths by history of the patient
SELECT d.history, COUNT(d.died) as number_of_deaths FROM vaccine_data d
WHERE  d.died = 'Y'
GROUP BY d.history
ORDER BY number_of_deaths DESC