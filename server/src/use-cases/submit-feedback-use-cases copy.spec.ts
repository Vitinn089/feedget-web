import { SubmitFeedbackUseCases } from "./submit-feedback-use-cases";

const createSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback =  new SubmitFeedbackUseCases(
  { create: createSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () =>{
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Exemple comment',
      screenshot: 'data:image/png;base64',
    })).resolves.not.toThrow();

    expect(createSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback withot type', async () =>{
    expect(submitFeedback.execute({
      type: '',
      comment: 'Exemple comment',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback withot comment', async () =>{
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback an invalid screenshot', async () =>{
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Exemple comment',
      screenshot: 'test.png',
    })).rejects.toThrow();
  });
});