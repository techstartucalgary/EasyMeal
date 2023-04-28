import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUpdateWeeklyGoals, useWeeklyGoals } from 'services/weeklyGoals';
import { EditWeeklyGoalModalProps } from './types';

const EditWeeklyGoalModal: FC<EditWeeklyGoalModalProps> = ({
  editGoalVisible,
  setEditGoalVisible,
}) => {
  const [editGoalValue, setEditGoalValue] = useState('0');

  const { updateWeeklyGoal } = useUpdateWeeklyGoals();
  const { weeklyGoal } = useWeeklyGoals();

  useEffect(() => {
    if (weeklyGoal?.goal) {
      setEditGoalValue(weeklyGoal?.goal.toString());
    }
  }, [weeklyGoal?.goal]);

  return (
    <Modal
      animationType="slide"
      visible={editGoalVisible}
      transparent
      onRequestClose={() => {
        setEditGoalVisible((prevValue) => !prevValue);
      }}
    >
      <View style={styles.editGoalContainer}>
        <View style={styles.editGoalHeader}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color="black"
            style={styles.closeEditGoalButton}
            onPress={() => setEditGoalVisible((prevVal) => !prevVal)}
          />
          <Text style={styles.editGoalHeaderText}>Edit cooking goal</Text>
        </View>

        <View
          style={[
            styles.rowSpaceBetween,
            styles.sectionHorizontalMargin,
            styles.sectionVerticalMargin1,
          ]}
        >
          <Text style={styles.editGoalText}>
            How many times do you want to home cook per week?
          </Text>
          <TextInput
            keyboardType="numeric"
            maxLength={3}
            placeholder="e.g. 20"
            defaultValue={weeklyGoal?.goal.toString() || '0'}
            value={editGoalValue}
            onChangeText={(text) => {
              // setEditGoalValue(text.replace(/\D/g, ''));
              setEditGoalValue(text);
            }}
            style={styles.sectionTextInput}
          />
        </View>
        <View style={[styles.rowSpaceBetween, styles.sectionHorizontalMargin]}>
          <Pressable
            onPress={() => {
              setEditGoalVisible((prevVal) => !prevVal);
            }}
            style={styles.sectionButtonLight}
          >
            <Text style={styles.sectionButtonLightText}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setEditGoalVisible((prevVal) => !prevVal);
              if (editGoalValue) {
                updateWeeklyGoal({
                  goal: parseInt(editGoalValue, 10),
                });
              }
            }}
            style={styles.sectionButtonDark}
          >
            <Text style={styles.sectionButtonDarkText}>Save Changes</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default EditWeeklyGoalModal;

const styles = StyleSheet.create({
  closeEditGoalButton: {
    position: 'absolute',
    top: 4,
    left: 40,
  },

  editGoalContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
  },
  editGoalHeader: {
    marginTop: 24,

    flexDirection: 'row',
    justifyContent: 'center',
  },
  editGoalHeaderText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#353535',
  },
  editGoalText: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#5D6066',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionButtonDark: {
    flex: 1,
    marginLeft: 16,
    height: 56,

    borderRadius: 28,
    backgroundColor: '#6536F9',

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionButtonDarkText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  sectionButtonLight: {
    flex: 1,
    height: 56,

    borderRadius: 28,
    backgroundColor: '#EEE5FF',

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionButtonLightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#6536F9',
  },
  sectionHorizontalMargin: {
    marginHorizontal: 24,
  },
  sectionTextInput: {
    flex: 1,
    marginLeft: 36,
    paddingRight: 16,
    height: 32,
    maxWidth: 120,
    width: 120,

    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D0DBEA',
    borderStyle: 'solid',

    textAlign: 'right',
    fontFamily: 'Inter-Medium',
    color: '#3D3D40',
  },
  sectionVerticalMargin1: {
    marginTop: 52,
    marginBottom: 80,
  },
});
