import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ESG_logo from "../../assets/ESG_logo.png";
import useEsg from "../../hooks/useEsg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IItem } from "../../interfaces/IItem";
import { Context } from "../../context/AuthContext";
import TextField from '@mui/material/TextField';
import { IFeedback } from "../../interfaces/IFeedback";

const steps = [
  {
    label: "Select ESG Type",
    description: `Environmental, social, and corporate governance (ESG) is an approach to evaluating the extent to which a corporation works on behalf of social goals 
      that go beyond the role of a corporation to maximize profits on behalf of the corporation's shareholders. 
  `,
  },
  {
    label: "Select a ESG Topic",
    description: "an ESG topic you want to talk about",
  },
  {
    label: "Contact info",
    description: ``,
  },
];

export default function EsgForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { handleResp } = React.useContext(Context);
  const { getSubjects, getTypes, createFeedback } = useEsg();
  const [listEsg, setListEsg] = React.useState([] as IItem[]);
  const [listSubject, setListSubject] = React.useState([] as IItem[]);
  const [esg, setEsg] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [contactInfo, setContactInfo] = React.useState("");
  React.useEffect(() => {
    console.log("render status");
    getSelect();
  }, []);

  const getSelect = async () => {

    let esgList = await getTypes();

    setListEsg(esgList);
    // let subjectList = await getSubjects(esg.length > 0 ? parseInt(esg) : 0);
    // setListSubject(subjectList);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (esg.length === 0) {
        handleResp("warning", "Select an option!");
        return;
      }
    }
    if (activeStep === 1) {
      if (subject.length === 0) {
        handleResp("warning", "Select an option!");
        return;
      }
      if (description.length === 0) {
        handleResp("warning", "Write a description!");
        return;
      }
    }
    if (activeStep === 2) {
        if (contactInfo.length === 0) {
          handleResp("warning", "Write an e-mail!");
          return;
        }
        if (esg.length === 0) {
            handleResp("warning", "Select an ESG option!");
            return;
        }
        if (subject.length === 0) {
            handleResp("warning", "Select an Topic option!");
            return;
          }
        try{
            let resp = await createFeedback({
                esg_id : parseInt(esg),
                subject_id : parseInt(subject),
                description: description,
                email: contactInfo
            } as IFeedback)
        }catch(error){
            handleResp("error", "An error has ocurred")
        }

      }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setEsg("");
    setSubject("");
    setDescription("");
    setContactInfo("");
    setActiveStep(0);
  };

  const handleChangeEsg = async (event: SelectChangeEvent) => {
    setEsg(event.target.value as string);
    let subjectList = await getSubjects(
      event.target.value.toString().length > 0
        ? parseInt(event.target.value)
        : 0
    );
    setListSubject(subjectList);
  };

  const handleChangeSubject = (event: SelectChangeEvent) => {
    setSubject(event.target.value as string);
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleChangeContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo(event.target.value);
  };

  return (
    <Box sx={{ minWidth : {  md: 600 }, maxWidth: 600 }}>
      <Box
        component="img"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto',
          height: 233,
          width: 300,
          maxHeight: { xs: 233, md: 400 },
          maxWidth: { xs: 350, md: 800 },
        }}
        alt="ESG Logo"
        src={ESG_logo}
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {index === 0 && (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="esgType-label">ESG Type</InputLabel>
                  <Select
                    labelId="esgType-label"
                    id="esgType"
                    value={esg}
                    label="ESG Type"
                    onChange={handleChangeEsg}
                  >
                    {listEsg?.map((field, index) => (
                      <MenuItem key={`esgselect_${index}`} value={field.id}>
                        {field.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {index === 1 && (
                <Box>
                  <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                    <InputLabel id="esgType-label">ESG Topic</InputLabel>
                    <Select
                      labelId="esgTopic-label"
                      id="esgTopic"
                      value={subject}
                      label="ESG Topic"
                      onChange={handleChangeSubject}
                    >
                      {listSubject?.map((field, index) => (
                        <MenuItem key={`topicselect_${index}`} value={field.id}>
                          {field.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                        id="esg-description"
                        label="Description"
                        fullWidth
                        placeholder="Tell us more about your experience"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleChangeDescription}
                    />
                </Box>
              )}
                {index === 2 && (
                <Box>
                  <TextField
                        id="esg-contact"
                        label="E-mail"
                        fullWidth
                        placeholder="E-mail"
                        value={contactInfo}
                        onChange={handleChangeContact}
                    />
                </Box>
              )}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
