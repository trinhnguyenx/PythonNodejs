import mysql.connector
from venv import logger

def save_data_into_DB(data):
    try:
        connection = mysql.connector.connect(user='root', password='123456', host='localhost')
        cursor = connection.cursor()
        query = "INSERT INTO `test`.`test_table3` (`title`, `company_name`, `venue`, `date`, `exp_year`, `level`, `salary`, `edu`, `src_pic`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        for i in data:
            cursor.execute(query, i)
        connection.commit()
        connection.close()
    except Exception as e:
        logger.error(f"Error occured while saving data to DB: {e}")