const prisma = require("../models/prisma");

BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};

exports.createUserSurvey = (userSurveys) => {
    return prisma.userSurvey.createMany({
        data: userSurveys
    })
}

exports.findUserSurveyByUserId = (surveyId, userId) => {
    return prisma.userSurvey.findMany({
        where: {
            userId,
            question: {
                surveyId
            }
        }
    })
}

exports.findScore = () => {
    return prisma.$queryRaw`with t3 as (with t1 as (select us.user_id, us.score,us.question_id, q.survey_id from user_survey us
        left join questions q on q.id = us.question_id)
        select survey_id, question_id, avg(score) avg_by_question
        from t1
        group by question_id) ,
        t4 as (SELECT question_id, max(score) full_score_per_question FROM ratings
        group by question_id)
        select survey_id, t4.question_id, avg_by_question, full_score_per_question from t3
        left join t4 on t3.question_id = t4.question_id`
}

exports.countUserDoSurvey = () => {
    return prisma.$queryRaw`with t11 as (select survey_id, count(distinct(user_id)) count_user_do_survey
    from user_survey us
    left join questions q on q.id = us.question_id
    group by survey_id),
    t22 as (with t2 as (with t1 as (with s as(
    select * from surveys
    ), u as (select *
    from users)
    select s.id survey_id, s.start_date, s.end_date, u.id user_id, u.created_at, u.deleted_at
    from u, s)
    select survey_id, count(survey_id) count_survey_id_temp, created_at, deleted_at, start_date, end_date 
    from t1
    group by survey_id, created_at, end_date, deleted_at, start_date
    having if ( deleted_at is null, created_at <= end_date, created_at <= end_date and start_date <= deleted_at))
    select survey_id, sum(count_survey_id_temp) count_total_user
    from t2
    group by survey_id)
    select t22.survey_id, count_total_user, count_user_do_survey
    from t22
    left join t11 on t11.survey_id = t22.survey_id`
}