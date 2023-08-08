import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

const ProfessionalDetails = (props) => {
  const { resumeInfo, setResumeInfo, setPage } = props;
  const [projects,setProjects]=React.useState([]);

  const [projectData,setProjectData]=React.useState({
    ProjectName:"",
    Description:"",

  });
  const [workSection, setWorkSection] = React.useState([]);

  const [workData, setWorkData] = React.useState({
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    jobDetails: "",
  });

  const saveData = () => {
    const isEmpty = Object.values(workData,projectData).some((x) => x.trim() === "");
    if (isEmpty) return;

    const duplicate = () => {
      let proarr = resumeInfo.professional.project || [];
      let arr = resumeInfo.professional.work || [];
      for (let i = 0; i < arr.length; i++) {
        if (JSON.stringify(arr[i]) === JSON.stringify(workData)) {
          return true;
        }
      }
      for (let i = 0; i < proarr.length; i++) {
        if (JSON.stringify(proarr[i]) === JSON.stringify(projectData)) {
          return true;
        }
      }
      return false;
    };

    if (duplicate()) return;

    const updatedValue = {
      ...resumeInfo.professional,
      work: (resumeInfo.professional.work || []).concat(workData),
      project: (resumeInfo.professional.project || []).concat(projectData),
    };
    const updateResumeInfo = {
      ...resumeInfo,
      professional: updatedValue,
    };
    setResumeInfo(updateResumeInfo);
  };

  React.useEffect(() => {
    saveData();
  }, [workSection.length],[projects.length]);

  const createWorkSection = () => {
    setWorkSection(workSection.concat(workExperienceForm()));
  };
  const createProjectSection = () => {
    setProjects(projects.concat(ProjectsForm()));
  };

  const workExperienceForm = () => {
    return (
      <SimpleGrid spacing={4} columns={[1, 1, 1, 2]} key={workSection.length}>
        <FormControl>
          <FormLabel>Job Title: </FormLabel>
          <Input
            type="text"
            placeholder="Software developer"
            onChange={(e) => {
              setWorkData((prev) => ({ ...prev, jobTitle: e.target.value }));
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Company/Employer: </FormLabel>
          <Input
            type="text"
            placeholder="Employer(Company) name"
            onChange={(e) => {
              setWorkData((prev) => ({ ...prev, company: e.target.value }));
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Start date: </FormLabel>
          <Input
            type="text"
            placeholder="Enter start date jan 2022"
            onChange={(e) => {
              setWorkData((prev) => ({ ...prev, startDate: e.target.value }));
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End date: </FormLabel>
          <Input
            type="text"
            placeholder="Enter end date jan 2023"
            onChange={(e) => {
              setWorkData((prev) => ({ ...prev, endDate: e.target.value }));
            }}
          />
          <FormHelperText>write present if ongoing</FormHelperText>
        </FormControl>
        <GridItem colSpan={[1, 1, 1, 2]}>
          <FormControl>
            <FormLabel>JOb Details:</FormLabel>
            <Textarea
              placeholder="Describe your role and achievements"
              onChange={(e) => {
                setWorkData((prev) => ({
                  ...prev,
                  jobDetails: e.target.value,
                }));
              }}
            />
            {/* <FormHelperText>Hit enter for newline</FormHelperText> */}
          </FormControl>
        </GridItem>
      </SimpleGrid>
    );
  };
  const ProjectsForm = () => {
    return (
      <SimpleGrid spacing={4} columns={[1, 1, 1, 2]} key={projects.length}>
        <FormControl>
          <FormLabel>Project Name: </FormLabel>
          <Input
            type="text"
            placeholder="Your Project Name"
            onChange={(e) => {
              setProjectData((prev) => ({ ...prev, ProjectName: e.target.value }));
            }}
          />
        </FormControl>
        <GridItem colSpan={[1, 1, 1, 2]}>
          <FormControl>
            <FormLabel>Description:</FormLabel>
            <Textarea
              placeholder="Describe your project"
              onChange={(e) => {
                setProjectData((prev) => ({
                  ...prev,
                  Description: e.target.value,
                }));
              }}
            />
            <FormHelperText>Hit enter for newline</FormHelperText>
          </FormControl>
        </GridItem>
      </SimpleGrid>
    );
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Summary:</FormLabel>
        <Textarea
          placeholder="Introduce yourself in few line"
          value={resumeInfo.professional.summary}
          onChange={(e) => {
            const updateValue = {
              ...resumeInfo.professional,
              summary: e.target.value,
            };
            const updateResumeInfo = {
              ...resumeInfo,
              professional: updateValue,
            };
            setResumeInfo(updateResumeInfo);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Skills:</FormLabel>
        <Textarea
          placeholder="Enter for new points"
          value={resumeInfo.professional.skills}
          onChange={(e) => {
            const updateValue = {
              ...resumeInfo.professional,
              skills: e.target.value,
            };
            const updateResumeInfo = {
              ...resumeInfo,
              professional: updateValue,
            };
            setResumeInfo(updateResumeInfo);
          }}
        />
        {/* <FormHelperText>Hit enter for newline</FormHelperText> */}
      </FormControl>
      {workSection}
      <Button
        colorScheme="messenger"
        onClick={createWorkSection}
        w="max-content"
        rightIcon={<AddIcon />}
      >
        Add Work Experience
      </Button>
   



      {projects}
      <Button
        colorScheme="messenger"
        onClick={createProjectSection}
        w="max-content"
        rightIcon={<AddIcon />}
      >
        Add Projects
      </Button>
      <HStack spacing={8} justify="center">
        <Button
          colorScheme="blue"
          onClick={() => {
            setPage((p) => p - 1);
          }}
          leftIcon={<ChevronLeftIcon />}
        >
          Back
        </Button>
        <Button
          colorScheme="whatsapp"
          onClick={() => {
            saveData();
            setPage((p) => p + 1);
          }}
          rightIcon={<ChevronRightIcon />}
        >
          Save
        </Button>
      </HStack>
    </Stack>
  );
};

export default ProfessionalDetails;
