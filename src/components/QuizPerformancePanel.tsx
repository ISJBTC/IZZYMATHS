
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, PieChart, Award } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell
} from 'recharts';

interface QuizPerformanceProps {
  topic: string;
}

const QuizPerformancePanel: React.FC<QuizPerformanceProps> = ({ topic }) => {
  // Sample performance data - in a real app, this would come from a database
  const getPerformanceData = () => {
    const baseData = [
      { chapter: 'Ch 1', score: Math.floor(Math.random() * 40) + 60 },
      { chapter: 'Ch 2', score: Math.floor(Math.random() * 40) + 60 },
      { chapter: 'Ch 3', score: Math.floor(Math.random() * 40) + 60 },
      { chapter: 'Ch 4', score: Math.floor(Math.random() * 40) + 60 },
      { chapter: 'Ch 5', score: Math.floor(Math.random() * 40) + 60 },
      { chapter: 'Ch 6', score: Math.floor(Math.random() * 40) + 60 },
      { chapter: 'Ch 7', score: Math.floor(Math.random() * 40) + 60 },
      { chapter: 'Ch 8', score: Math.floor(Math.random() * 40) + 60 },
    ];
    
    // Add some variation based on the topic
    const topicSeed = topic.length % 5;
    return baseData.map(item => ({
      ...item,
      score: Math.max(0, Math.min(100, item.score + (topicSeed * 2 - 5)))
    }));
  };
  
  const performanceData = getPerformanceData();
  
  // Calculate average score
  const avgScore = performanceData.reduce((sum, item) => sum + item.score, 0) / performanceData.length;
  
  // Prepare pie chart data
  const pieData = [
    { name: 'Completed', value: performanceData.filter(d => d.score > 0).length },
    { name: 'Remaining', value: performanceData.filter(d => d.score === 0).length }
  ];
  
  const COLORS = ['#0088FE', '#BBBBBB'];
  
  // Best performing chapter
  const bestChapter = [...performanceData].sort((a, b) => b.score - a.score)[0];
  
  // Format topic name for display
  const formatTopicName = (topicName: string) => {
    return topicName
      .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
      .trim();
  };
  
  const displayName = formatTopicName(topic);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <div className="flex items-center mb-4">
        <BarChart2 className="h-6 w-6 text-math-primary mr-2" />
        <h3 className="text-xl font-bold">{displayName} Performance</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgScore)}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Best Chapter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-yellow-500 mr-1" />
              <div>
                <div className="text-lg font-bold">{bestChapter.chapter}</div>
                <div className="text-sm text-gray-600">{bestChapter.score}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completion</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="text-2xl font-bold">{Math.round(pieData[0].value / (pieData[0].value + pieData[1].value) * 100)}%</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chapter Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="chapter" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPerformancePanel;
