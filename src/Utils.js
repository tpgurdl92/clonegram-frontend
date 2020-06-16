
export const dateTransformer = (dateString) => {

    let postDate = new Date(dateString);    
    let year = postDate.getFullYear();
    let month = postDate.getMonth()+1;
    let date = postDate.getDate();
    let hours = postDate.getHours();
    let minutes = postDate.getMinutes();
    let seconds = postDate.getSeconds();

    
    let today = new Date();   
    let currentYear =today.getFullYear(); // 년도
    let currentMonth =today.getMonth() + 1;  // 월
    let currentDate = today.getDate();
    let currentHours =today.getHours(); // 시
    let currentMinutes =today.getMinutes();  // 분
    let currentSeconds =today.getSeconds(); 


    if(year!==currentYear){
        return `${year}년 ${month}월 ${date}일`;
    }else if(month!==currentMonth){
        return ` ${month}월 ${date}일`;
    }else if(date===currentDate-1){
        if(hours-currentHours>0){
            return `${24-(hours-currentHours)}시간 전`;
        }
        return ` ${month}월 ${date}일`;
    }else if(date===currentDate){
        if(currentHours===hours){
            return `${currentMinutes-minutes}분 전`;
        }
        return `${currentHours-hours}시간 전`;
    }else{
        return ` ${month}월 ${date}일`;
    }
}


export const dateTransformerForMSG = (dateString) => {

    let postDate = new Date(dateString);    
    let year = postDate.getFullYear();
    let month = postDate.getMonth()+1;
    let date = postDate.getDate();
    let hours = postDate.getHours();
    let minutes = postDate.getMinutes();
    let seconds = postDate.getSeconds();

    return `${year}년 ${month}월 ${date}일 `;
}