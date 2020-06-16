import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FatText from "./FatText";
import Button from "./Button";

const Wrapper = styled.div`
    border-radius:10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:100%;
    height:100%;

`;
const Header = styled.header`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
`;
const LangBox = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;
const Container = styled.div`
    margin:18px 0px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const LangText= styled.div`
    color:${props=>props.theme.darkGreyColor};
`;
const TextArea = styled.textarea`
    width:80%;
    height:200px;
    ${props=>props.theme.whiteBox};
    resize:none;
`;
const ButtonCover = styled.div`
    width:100%;
    height:auto;
    padding:0px 40%;
    display:flex;
    justify-content:center;
`;

const textSet ={
    korean:{
        language:"korean",
        title:"안내",
        close:"닫기",
        text:
       `클론그램을 방문해주셔서 감사합니다.\n\n\
본 사이트는 프론트엔드 기술 공부 목적으로 제작된 인스타그램의 클론사이트입니다.\n\n\
사이트 입장에는 메일주소 인증을 필요로 합니다.\n\n\
인증에 사용되는 메일주소는 개인정보로서 개인적,상업적 용도로 사용되지 않으니
안심하고 인증을 부탁드립니다.\n\
(각 메일서비스 정책 상 인증메일의 수신이 어려울 수 있습니다.\n\
가급적 G-MAIL서비스를 통한 인증을 부탁드립니다)\n\n\
※인증메일 도착하지 않을 경우, 스팸메일함의 확인을 부탁드립니다.\n\n\
문의 사항이 있으실 시 아래의 메일을 통하여 문의주시거나 
로그인 후 DM을 통해 문의주시면 확인 후 답변드리겠습니다. \n\n\
감사합니다.\n\n\
이메일주소:tpgurdl92@gmail.com`
    },
    japanese:{
        language:"japanese",
        title:"案内",
        close:"閉じる",
        text:
    `クローングラムにご訪問いただき、ありがとうございます。\n\n\
本サイトはフロントエンド技術勉強を目的として制作した、インスタグラムのクローンサイトとなります。\n\n\
サイトに利用するためにはメール認証をいただく必要がございます。\n\n\
認証に使われるメールアドレスは個人情報として個人的、商業的には使われないので
ご安心ください。\n\
（各メールサービスのポリシーにより、認証メールの受信ができない場合があります。\n\
可能な場合、G-MAILサービスにて認証の程、よろしくお願いいたします。）\n\n\
※認証メールが届かない場合、スパムメール箱をご確認ください。\n\n\
本サイトに関して問い合わせがある場合、下記のメールアドレスまで問い合わせいただくか、\n\n\
ログイン後ダイレクトメッセージを通じてお問い合わせをお願いいたします。\n\n\
ありがとうございます。\n\n\
メールアドレス：tpgurdl92@gmail.com`
    },
    english:{
        language:"english",
        title:"guideline",
        close:"close",
        text:
        `thank you for visiting clonegram.\n\n\
this sited is clone site of Instagram developed for studying frontend skill, react,graphql,nodejs and etc.\n\n\
it is required to authenticate your mail address for entering home.\n\n\
the mail address used for authentication won'be used for private, commercial purpose.\n\
(I have found a trouble with sending authentication mail because of policy of mail service which is used.\n\
I confirmed that G-MAIL is available so please use G-MAIL for authentication)\n\n\
※if you couldn't get authentication mail, please check your spam mail box\n\n\
if you have any question Please e-mail me to the following e-mail address. 
or you may send me DM after you finished authentication.\n\n\
thank you.\n\n\
E-mail:tpgurdl92@gmail.com`
    }

}
export default ({toggleModal}) => {
      const [textLang, setTextLang] = useState('korean');
      const [text, setText] = useState(textSet.korean);
      const handleChange = (event) => {
        setTextLang(event.target.value);
      };
      useEffect(()=>{
          console.log("dd");
        if(textLang==="korean"){
            console.log("1");
            setText(textSet.korean);
        }else if(textLang==="japanese"){
            setText(textSet.japanese);
        }else{
            setText(textSet.english);
        }
      },[textLang]);
    
    return (
        <Wrapper>
            <Header>
                <FatText text={text.title} size="20" color="black"/>
                <LangBox>
                <Radio
                    checked={textLang === 'korean'}
                    onChange={handleChange}
                    value="korean"
                    color="primary"
                    name="radio-button-demo"
                    />
                <LangText>한국어</LangText>
                <Radio
                    checked={textLang === 'japanese'}
                    onChange={handleChange}
                    value="japanese"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'B' }}
                />
                <LangText>日本語</LangText>
                <Radio
                    checked={textLang === 'english'}
                    onChange={handleChange}
                    value="english"
                    color="default"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'D' }}
                />
                <LangText>English</LangText>
                </LangBox>
            </Header>
            <Container>
                <TextArea value={text.text} readOnly="readOnly"/>
            </Container>
            <ButtonCover>
                <Button text={text.close} onClick={e=>toggleModal(e)}/>
            </ButtonCover>
        </Wrapper>

    ); 
}