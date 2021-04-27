from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/flask"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class statisticsModel(db.Model):
    __tablename__ = 'statistics'

    abbr = db.Column(db.String, primary_key=True)
    state = db.Column(db.String)
    age_mean = db.Column(db.Integer)
    age_median = db.Column(db.Integer)
    age_max = db.Column(db.Integer)
    age_min = db.Column(db.Integer)
    symptoms_mean = db.Column(db.Integer)
    symptoms_median = db.Column(db.Integer)
    symptoms_max = db.Column(db.Integer)
    symptoms_min = db.Column(db.Integer)
    symptoms_count = db.Column(db.Integer)
    hospital_mean = db.Column(db.Integer)
    hospital_median = db.Column(db.Integer)
    hospital_max = db.Column(db.Integer)
    hospital_min = db.Column(db.Integer)
    onset_mean = db.Column(db.Integer)
    onset_median = db.Column(db.Integer)
    onset_max = db.Column(db.Integer)
    onset_min = db.Column(db.Integer)


    def __init__(self, state, age_median, age_max):
        self.state = name
        self.age_median = age_median
        self.age_max = age_max

    def __repr__(self):
        return f"<state {self.state}>"


@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/vaccine"
    )


@app.route("/api/v1.0/vaccine")
def vaccine():
    # Create our session (link) from Python to the DB
    session = db.Session(engine)

    """Return a list of vaccine data"""
    # Query all states
    results = db.session.query(statistics.state, statistics.age_mean, statistics.age_median, statistics.age_max, statistics.age_min).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_statistics
    all_statistics = []
    for name, age, sex in results:
        statistics_dict = {}
        statistics_dict["state"] = state
        statistics_dict["age_mean"] = age_mean
        statistics_dict["age_median"] = age_median
        statistics_dict["age_min"] = age_min
        statistics_dict["age_max"] = age_max
        statistics_dict["symptoms_mean"] = symptoms_mean
        statistics_dict["symptoms_median"] = symptoms_median
        statistics_dict["symptoms_min"] = symptoms_min
        statistics_dict["symptoms_max"] = symptoms_max
        statistics_dict["symptoms_count"] = symptoms_count
        statistics_dict["hospital_mean"] = hospital_mean
        statistics_dict["hospital_median"] = hospital_median
        statistics_dict["hospital_min"] = hospital_min
        statistics_dict["hospital_max"] = hospital_max
        statistics_dict["onset_mean"] = onset_mean
        statistics_dict["onset_median"] = onset_median
        statistics_dict["onset_min"] = onset_min
        statistics_dict["onset_max"] = onset_max

        all_statistics.append(statistics_dict)


    return jsonify(all_statistics)

if __name__ == '__main__':
    app.run(debug=True)