// File: components/WorksheetContent.tsx
import type React from "react";
import { Typography, Divider } from "antd";
import styles from "../styles/generatedWorksheet.module.less";

const { Title, Text } = Typography;

interface Question {
  id: number;
  type:
    | "Multiple Choice"
    | "Fill in the Blanks"
    | "Short Answer"
    | "Answer Key"
    | "True/False"
    | "Word Problem"
    | "Bonus Question"
    | "Brain Teaser"
    | "One-word Answer";
  question: string;
  options?: string[];
  instruction?: string;
  section?: string;
  matchLeft?: string[];
  matchRight?: string[];
}

interface WorksheetContentProps {
  title: string;
  grade: string;
  subject: string;
  questions: Question[];
  bonusContent?: {
    funFact?: string;
    realWorld?: string;
    note?: string;
    brainTeaser?: string;
  };
}

const WorksheetContent: React.FC<WorksheetContentProps> = ({
  title,
  grade,
  subject,
  questions,
  bonusContent,
}) => {
  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "Multiple Choice":
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <Text className={styles.questionNumber}>
                Question {question.id}
              </Text>
              <Text className={styles.questionType}>{question.type}</Text>
            </div>
            <Text className={styles.questionText}>{question.question}</Text>
            {question.options && question.options.length > 0 ? (
              <div className={styles.optionsList}>
                {question.options.map((option, index) => (
                  <div key={index} className={styles.option}>
                    <input
                      type="radio"
                      name={`q${question.id}`}
                      id={`q${question.id}-opt${index}`}
                      className={styles.optionInput}
                    />
                    <label htmlFor={`q${question.id}-opt${index}`}>
                      {String.fromCharCode(97 + index)}) {option}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noOptionsContainer}>
                <Text className={styles.noOptionsWarning}>
                  No options provided for this question
                </Text>
              </div>
            )}
          </div>
        );

      case "Fill in the Blanks":
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <Text className={styles.questionNumber}>
                Question {question.id}
              </Text>
              <Text className={styles.questionType}>{question.type}</Text>
            </div>
            <Text className={styles.questionText}>{question.question}</Text>
            {question.instruction && (
              <Text className={styles.questionInstruction}>
                {question.instruction}
              </Text>
            )}
          </div>
        );

      case "One-word Answer":
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <Text className={styles.questionNumber}>
                Question {question.id}
              </Text>
              <Text className={styles.questionType}>{question.type}</Text>
            </div>
            <Text className={styles.questionText}>{question.question}</Text>
            <div className={styles.answerLines}>
              <div className={styles.answerLine}></div>
            </div>
          </div>
        );

      case "Match the Following":
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <Text className={styles.questionNumber}>
                Question {question.id}
              </Text>
              <Text className={styles.questionType}>{question.type}</Text>
            </div>
            <Text className={styles.questionText}>{question.question}</Text>

            {question.matchLeft || question.matchRight ? (
              <div style={{ display: "flex", gap: 24 }}>
                <div>
                  {(question.matchLeft || []).map((opt, idx) => (
                    <div key={idx} className={styles.matchOption}>
                      <span className={styles.matchText}>{opt}</span>
                    </div>
                  ))}
                </div>
                <div>
                  {(question.matchRight || []).map((opt, idx) => (
                    <div key={idx} className={styles.matchOption}>
                      <span className={styles.matchText}>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              question.options && (
                <div className={styles.matchOptions}>
                  {question.options.map((option, index) => {
                    const optionMatch = option.match(/^([a-e])\.\s*(.*)$/i);
                    if (optionMatch) {
                      return (
                        <div key={index} className={styles.matchOption}>
                          <span className={styles.matchLetter}>
                            {optionMatch[1]}.
                          </span>
                          <span className={styles.matchText}>
                            {optionMatch[2]}
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className={styles.matchOption}>
                          <span className={styles.matchText}>{option}</span>
                        </div>
                      );
                    }
                  })}
                </div>
              )
            )}
          </div>
        );

      case "Short Answer":
        // Regular short answer question
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <Text className={styles.questionNumber}>
                Question {question.id}
              </Text>
              <Text className={styles.questionType}>{question.type}</Text>
            </div>
            <Text className={styles.questionText}>{question.question}</Text>
            <div className={styles.answerLines}>
              {[...Array(4)].map((_, index) => (
                <div key={index} className={styles.answerLine}></div>
              ))}
            </div>
          </div>
        );

      case "True/False":
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <Text className={styles.questionNumber}>
                Question {question.id}
              </Text>
              <Text className={styles.questionType}>{question.type}</Text>
            </div>
            <Text className={styles.questionText}>{question.question}</Text>
            <div className={styles.trueFalseOptions}>
              <div className={styles.trueFalseOption}>
                <input
                  type="radio"
                  name={`q${question.id}`}
                  id={`q${question.id}-true`}
                />
                <label htmlFor={`q${question.id}-true`}>True</label>
              </div>
              <div className={styles.trueFalseOption}>
                <input
                  type="radio"
                  name={`q${question.id}`}
                  id={`q${question.id}-false`}
                />
                <label htmlFor={`q${question.id}-false`}>False</label>
              </div>
            </div>
          </div>
        );

      case "Word Problem":
        return (
          <div key={question.id} className={styles.questionContainer}>
            <div className={styles.questionHeader}>
              <Text className={styles.questionNumber}>
                Question {question.id}
              </Text>
              <Text className={styles.questionType}>{question.type}</Text>
            </div>
            <Text className={styles.questionText}>{question.question}</Text>
            <div className={styles.answerLines}>
              {[...Array(6)].map((_, index) => (
                <div key={index} className={styles.answerLine}></div>
              ))}
            </div>
          </div>
        );

      case "Bonus Question":
        return (
          <div key={question.id} className={styles.bonusQuestionContainer}>
            <div className={styles.questionHeader}>
              <Text className={styles.questionNumber}>
                Bonus Question {question.id}
              </Text>
              <Text className={styles.bonusQuestionType}>{question.type}</Text>
            </div>
            <Text className={styles.bonusQuestionText}>
              {question.question}
            </Text>
            <div className={styles.answerLines}>
              {[...Array(6)].map((_, index) => (
                <div key={index} className={styles.answerLine}></div>
              ))}
            </div>
          </div>
        );

      case "Brain Teaser":
        return (
          <div key={question.id} className={styles.brainTeaserContainer}>
            <div className={styles.questionHeader}>
              <Text className={styles.questionNumber}>
                Brain Teaser {question.id}
              </Text>
              <Text className={styles.brainTeaserType}>{question.type}</Text>
            </div>
            <Text className={styles.brainTeaserText}>{question.question}</Text>
            <div className={styles.answerLines}>
              {[...Array(8)].map((_, index) => (
                <div key={index} className={styles.answerLine}></div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Group questions by section label if provided
  const sectionOrder: string[] = [];
  const groupedBySection = questions.reduce((acc: Record<string, Question[]>, q) => {
    const key = q.section || "Questions";
    if (!acc[key]) {
      acc[key] = [];
      sectionOrder.push(key);
    }
    acc[key].push(q);
    return acc;
  }, {});

  return (
    <div className={styles.worksheetContent}>
      <div className={styles.worksheetPaper}>
        <div className={styles.worksheetHeader}>
          <Title level={2} className={styles.worksheetTitle}>
            {title}
          </Title>
          <div className={styles.worksheetMeta}>
            <div className={styles.metaRow}>
              <Text className={styles.metaItem}>Grade: {grade}</Text>
              <Text className={styles.metaItem}>Subject: {subject}</Text>
              <Text className={styles.metaItem}>Date: ___________</Text>
            </div>
            <div className={styles.metaRow}>
              <Text className={styles.metaItem}>
                Name: ________________________ Score: ______/20
              </Text>
            </div>
          </div>
          <div className={styles.generatedBy}>
            <Text className={styles.generatedByText}>
              Generated by AIWorksheetPro.com
            </Text>
          </div>
        </div>

        <Divider className={styles.worksheetDivider} />

        <div className={styles.instructionsSection}>
          <Title level={4} className={styles.instructionsTitle}>
            Instructions:
          </Title>
          <ul className={styles.instructionsList}>
            <li>Read each question carefully before answering</li>
            <li>Show your work for calculation problems</li>
            <li>Check your answers before submitting</li>
            <li>For True/False questions, circle the correct answer</li>
          </ul>
        </div>

        <div className={styles.questionsSection}>
          {sectionOrder.map((sectionLabel) => (
            <div key={sectionLabel}>
              <Title level={4} className={styles.instructionsTitle}>
                {sectionLabel}
              </Title>
              {groupedBySection[sectionLabel].map((question) => renderQuestion(question))}
            </div>
          ))}
        </div>

        {(bonusContent?.funFact || bonusContent?.realWorld || bonusContent?.brainTeaser || bonusContent?.note) && (
          <div className={styles.bonusGroup}>
            <Title level={3} className={styles.bonusGroupTitle}>
              BONUS CONTENT
            </Title>
            {bonusContent?.funFact && (
              <div className={styles.bonusSection}>
                <Title level={4} className={styles.bonusTitle}>
                  Fun Fact
                </Title>
                <Text className={styles.bonusText}>{bonusContent.funFact}</Text>
              </div>
            )}
            {bonusContent?.realWorld && (
              <div className={styles.bonusSection}>
                <Title level={4} className={styles.bonusTitle}>
                  Real-World Application
                </Title>
                <Text className={styles.bonusText}>{bonusContent.realWorld}</Text>
              </div>
            )}
            {bonusContent?.brainTeaser && (
              <div className={styles.bonusSection}>
                <Title level={4} className={styles.bonusTitle}>
                  Brain Teaser
                </Title>
                <Text className={styles.bonusText}>{bonusContent.brainTeaser}</Text>
              </div>
            )}
            {bonusContent?.note && (
              <div className={styles.bonusSection}>
                <Title level={4} className={styles.bonusTitle}>
                  Additional Note
                </Title>
                <Text className={styles.bonusText}>{bonusContent.note}</Text>
              </div>
            )}
          </div>
        )}

        <div className={styles.worksheetFooter}>
          <div className={styles.footerBranding}>
            <Text className={styles.footerText}>
              Made by AIWorksheetPro.com
            </Text>
            <Text className={styles.footerSubtext}>
              Create unlimited worksheets with AI • Try Free Today
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetContent;
