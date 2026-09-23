import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5da',
    borderRadius: 4,
    padding: 10,
    marginBottom: 5,
    fontSize: theme.fontSizes.body,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const ownerNameHasError =
    formik.touched.ownerName && formik.errors.ownerName;
  const repositoryNameHasError =
    formik.touched.repositoryName && formik.errors.repositoryName;
  const ratingHasError = formik.touched.rating && formik.errors.rating;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, ownerNameHasError && styles.inputError]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {ownerNameHasError && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[styles.input, repositoryNameHasError && styles.inputError]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {repositoryNameHasError && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[styles.input, ratingHasError && styles.inputError]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
      />
      {ratingHasError && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        multiline
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values);
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
