import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/svg/logo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// define form values 
const formval = [
  {
    id: 'user_request_first_name',
    label: 'First Name',
    type: 'input',
    name: 'firstName',
    colVal: 6,
  },
  {
    id: 'user_request_last_name',
    label: 'last Name',
    type: 'input',
    name: 'lastName',
    colVal: 6,
  },
  {
    id: 'user_request_emailAddress',
    label: 'email address',
    type: 'input',
    name: 'emailAddress',
    colVal: 6,
  },
  {
    id: 'user_request_currentJobTitle',
    label: 'Current job title',
    type: 'input',
    name: 'currentJobTitle',
    colVal: 6,
  },
  {
    id: 'user_request_company',
    label: 'Company/Organization',
    type: 'input',
    name: 'company',
    colVal: 6,
  },
  {
    id: 'user_request_linkedin',
    label: 'Linkedin url',
    type: 'input',
    name: 'linkedin',
    colVal: 6,
  },
  {
    id: 'user_request_country',
    label: 'Country',
    type: 'select',
    name: 'country',
    colVal: 12,
  },
]
// groupedItems
const groupedItems = (type) => {
  if (!type.length) return [];
  if (type.length) {
    let groupedItems = {};

    for (let item of type) {
      let firstLetter = item.name[0];
      if (!groupedItems[firstLetter]) {
        groupedItems[firstLetter] = [];
      }
      groupedItems[firstLetter].push(item);
    }

    return groupedItems;
  }

  return {}

}
// create formData 
const FormInputs = ({ formState, options, loading, setValue }) => {
  return <>
    {formval.map((element) => {
      return <div className={`col-12 py-3 col-md-${element.colVal}`} key={element.name}>
        <label className="input_label" htmlFor={element.id}>{element.label}</label>
        {element.type === 'input' ?
          <input
            className="form-control input_field"
            autoComplete="off"
            required
            disabled={loading}
            type={element.name === 'emailAddress' ? 'email' : 'text'}
            name={element.name}
            id={element.id}
            placeholder={element.label}
            onChange={e => setValue({ name: element.name, val: e.target.value })}
            value={formState[element.name]}
          />
          :
          <select
            onChange={e => setValue({ name: element.name, val: e.target.value })}
            placeholder={element.label}
            name={element.name}
            required
            disabled={loading}
            className="form-control select_field"
            id={element.id}
            value={element.value}
          >
            {Object.keys(groupedItems(options)).map((key, index) => {
              return <optgroup key={index} label={key}>
                {groupedItems(options)[key].map(country => {
                  return <option
                    key={country.code}
                    value={country.name}
                  >
                    {country.name}
                  </option>

                })}
              </optgroup>

            })}
          </select>
        }
      </div>
    })}
  </>
}

const Frame = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    currentJobTitle: '',
    company: '',
    linkedin: '',
    country: ''
  });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  // get countries and cradle 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: res } = await axios.get(`${process.env.REACT_APP_API_URL}misc/countries`);
        setOptions(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    const fetchCradle = () => {

      (function (C, A, L) {
        let p = function (a, ar) {
          a.q.push(ar);
        };
        let d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src =
                A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = api.q || [];
              typeof namespace === "string"
                ? (cal.ns[namespace] = api) && p(api, ar)
                : p(cal, ar);
              return;
            }
            p(cal, ar);
          };
      })(
        window,
        "https://schedule.usecradleapps.com/embed/embed.js",
        "init"
      );
      Cal("init", { origin: "https://schedule.usecradleapps.com" });

      Cal("inline", {
        elementOrSelector: "#my-cal-inline",
        calLink: "pca/30min",
      });

      Cal("ui", { "theme": "light", styles: { branding: { brandColor: "#000000" } } });
    }
    fetchData();
    fetchCradle();
  }, []);
  // disable Btn
  const disableBtn = () => {
    var disable = false;
    Object.entries(formState).forEach(([key, value]) => {
      if (!value) {
        disable = true;
      }
    });
    return {
      disable: disable,
    };
  };
  // validate url 
  const isValidUrl = (string) => {
    var urlRegex = new RegExp(
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
    );

    return urlRegex.test(string);
  };
  const contactTalen = async (event) => {
    event.preventDefault();
    setLoading(true)
    setErrors(null)
    try {
      if (!isValidUrl(formState.linkedin))
        throw new Error("Linkedin url is not valid url");

      // set headers
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      // set form Data
      const data = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        data.append(key, value);
      });
      const { data: res } = await axios.post("https://sheet.best/api/sheets/30ea3e94-ce2f-4755-b269-6e54c31e5868",
        data,
        config
      );
      toast.success('Form submitted successfully!');
      setTimeout(() => {
        setLoading(false)
        navigate('/');
      }, 3000);
      return;
    } catch (err) {
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
        setErrors(err.response.data.message)
      } else {
        toast.error(err.message);
        setErrors(err.message)
      }
      setLoading(false)
    }
  }

  return (
    <div className="row auth_row_head">
      {/* image left */}
      <div className="transleft authImg col-7 ">
        <div className="v-image__image v-image__image--cover"></div>
      </div>
      <div className="transright col-md-5 col-12">
        <div className="auth_content">
          <form
            onSubmit={contactTalen}
            className="transIn auth_content__email row"
          >
            {/* header */}
            <header className="py-3 col-12 d-flex align-center justify-content-center">
              <div className="d-flex align-items-center gap-3">
                <Link to="/">
                  <Logo />
                </Link>
                <h2 className="mb-0">Talen.ai <span className="ball"></span></h2>
              </div>
            </header>
            {/* subtext */}
            <div className="py-3 col-12">
              <p className="label m-0 p-0">
                <span>Thank you for choosing talenai </span>
                <br />
                <br />
                <span>
                  Please provide us with the following information, after a
                  verification process, You will receive an email with
                  the sign up link to the application. This won't take a while.
                </span>
              </p>
            </div>
            {/* form inputs */}
            <FormInputs
              loading={loading}
              options={options}
              formState={formState}
              setValue={value =>
                setFormState({ ...formState, [value.name]: value.val })}
            />
            {/* errors */}
            {errors ? <span className="col-12 transIn text-danger errorText">{errors}</span> : <></>}
            <div className="py-3 col-12">
              <p className="label m-0 p-0">
                <span>
                  Please schedule a call to finish your signup, then click the submit button after scheduling your call.
                </span>
              </p>
            </div>
            {/* craddle */}
            <div className="py-3 col-12">
              <div
                style={{ width: '100%', height: '100%', overflow: 'auto' }}
                id="my-cal-inline"
              ></div>
            </div>
            {/* button */}
            <div className="py-3 col-12 text-center">
              <button disabled={loading || disableBtn().disable} type="submit" className="btn Btn">
                {loading ? <span className="loader spinner"></span> : <span>Submit</span>}
              </button>
            </div>
          </form>
        </div>
      </div >
      <ToastContainer />
    </div >
  );
};

export default Frame;
