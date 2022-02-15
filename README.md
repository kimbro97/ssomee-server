# ssomee-server

## 사용 스택

- NodeJS
- Express
- Mysql
- sequelize

## DB-Schema
![](https://images.velog.io/images/rlagudwog/post/d27c01d4-1df0-453c-864e-c16857d50219/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-14%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.29.38.png)

### user table
- name : 회원 이름
- email : 회원 이메일
- password : 회원 비밀번호
- admin : 관리자 권한 true 값이면 관리자
- signout_at : 해당 이메일의 탈퇴 시기

### order table
- userId : 어떤 유저가 주문을 했는지 알기위해서 FK로 설정
- shop : 구매하고자하는 구매처
- image_url : 구매하고자하는 상품 이미지
- total_price : 상품의 총 가격
- second_payment : 2차 결제 날짜
- delivery_address : 배송지
- user_mobile : 유저 연락처
- approval : false면 반려 true면 승인
- overdue : false면 연체자, true면 비연체자
- completedAt : 2차결제까지 완료한 유저 기록
- step : 주문 단계별 임시 저장
> user 테이블과 order 테이블을 1:N 관계로 설정한 이유는 한명의 유저는 여러개의 주문을 할 수 있지만 하나의 주문은 여러사람이 할 수 없기때문에 1:N 관계로 설정했습니다.

## API Document
https://rlagudwog.gitbook.io/ssomee-server/

## 사용법
1. repo에서 git clone 한다.
2. clone 받아온 폴더에서 npm install 한다.
3. .env.example 파일을 .env로 수정
4. 환경변수에 값을 할당해준다.  
    - ACCESS_TOKEN = 비밀키
    - DATABASE_USER = DB 유저이름
    - DATABASE_PASSWORD = DB 패스워드
    - DATABASE = DB 이름
    - DATABASE_HOST = DB 호스트
5. sequel pro로 데이터베이스 생성
6. npx sequelize-cli db:migrate 명령어로 DB에 마이그레이션