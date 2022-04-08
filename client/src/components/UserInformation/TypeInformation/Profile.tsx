import React, { useEffect, useState } from "react";
import InteractiveBtn from "../../../Comp-Single/InteractiveBtn";
import "../../../styles/components/UserInformation/TypeInformation/Profile.css";
import { BiUser } from "react-icons/bi";
import InputForm from "../../../Comp-Single/InputForm";
import { useLazyQuery, useMutation } from "@apollo/client";
import { getUserInformation, setUserInformation } from "../../../Apollo/User";
import jwt from "jwt-decode";

function Profile() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setUserInformationMutation().then(() => {
      window.dispatchEvent(new Event("changedInformation"));
    });
  };

  const [id, setId] = useState<string>();
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [phoneNr, setPhoneNr] = useState<string>("");

  const [ranOnce, setRanOnce] = useState<boolean>(false);

  const [getUserInformationQuery, { data, loading, error }] = useLazyQuery(
    getUserInformation,
    {
      variables: {
        id: id,
      },
    }
  );

  useEffect(() => {
    if (data && data.getUserInfo && !ranOnce) {
      setFirst(data.getUserInfo.first);
      setLast(data.getUserInfo.last);
      setPhoneNr(data.getUserInfo.phoneNumber);
      setDate(new Date(data.getUserInfo.birthDate));
      setRanOnce(true);
    }
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { id }: { id: string } = jwt(token);
      if (id) {
        setId(id);
      }
    }
  }, []);

  useEffect(() => {
    if (id && !ranOnce) {
      getUserInformationQuery();
    }
  }, [id]);

  const [date, setDate] = useState<Date | string>("dd/mm/yyyy");
  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<string>();

  const [
    setUserInformationMutation,
    { data: dataM, loading: loadingM, error: errorM },
  ] = useMutation(setUserInformation, {
    variables: {
      id: id,
      first: first,
      last: last,
      phoneNumber: phoneNr,
      birthDate: date,
    },
  });

  useEffect(() => {
    if (date && date instanceof Date) {
      const dayUTC = date.toString().split(" ")[2];
      const monthUTC = date.getUTCMonth();
      const yearUTC = date.getUTCFullYear();
      setDay(dayUTC);
      if (monthUTC + 1 < 10) {
        setMonth("0" + (monthUTC + 1).toString());
      } else {
        setMonth((monthUTC + 1).toString());
      }
      setYear(yearUTC.toString());
    }
  }, [date]);

  return (
    <div className="profile">
      <h2>Profile &amp; security</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile__title">
          <span>
            <BiUser />
          </span>
          Personal details
        </div>
        <div className="profile__inputs">
          <InputForm
            value={data ? (data.getUserInfo ? data.getUserInfo.first : "") : ""}
            width={475}
            height={50}
            placeholder={"First name"}
            type={"text"}
            border={[0, 0, 7.5, 0]}
            transformAmount={-190}
            setInputParent={setFirst}
          />
          <InputForm
            value={data ? (data.getUserInfo ? data.getUserInfo.last : "") : ""}
            width={475}
            height={50}
            placeholder={"Last name"}
            type={"text"}
            border={[7.5, 0, 7.5, 0]}
            transformAmount={-190}
            setInputParent={setLast}
          />
          <InputForm
            width={475}
            height={50}
            placeholder={"Customer number"}
            type={"text"}
            border={[7.5, 0, 7.5, 0]}
            transformAmount={-190}
            value={id ? id : ""}
            locked={true}
            bgColor={"white"}
          />
          <InputForm
            width={475}
            height={50}
            placeholder={"Birthday"}
            type={"text"}
            border={[7.5, 0, 7.5, 0]}
            transformAmount={-190}
            calendar={true}
            value={
              day && month && year
                ? `${day}/${month}/${year}`
                : data
                ? data.getUserInfo
                  ? data.getUserInfo.birthDate
                    ? data.getUserInfo.birthDate
                    : "dd/mm/yyyy"
                  : "dd/mm/yyyy"
                : "dd/mm/yyyy"
            }
            setDate={setDate}
            date={date}
          />
          <InputForm
            width={475}
            height={50}
            placeholder={"Phone number (optional)"}
            type="text"
            border={[7.5, 0, 7.5, 0]}
            transformAmount={-190}
            value={
              data
                ? data.getUserInfo
                  ? data.getUserInfo.phoneNumber
                    ? data.getUserInfo.phoneNumber
                    : ""
                  : ""
                : ""
            }
            setInputParent={setPhoneNr}
            phoneNumber={true}
          />
        </div>
        <div className="profile__btn">
          <InteractiveBtn
            type="submit"
            text="Save changes"
            width={175}
            height={45}
            isLoading={loadingM}
          />
        </div>
      </form>
    </div>
  );
}

export default Profile;
