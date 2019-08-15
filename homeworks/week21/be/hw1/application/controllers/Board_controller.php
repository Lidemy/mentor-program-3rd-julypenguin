<?php
class Board_controller extends CI_Controller {

  function __construct() {
    parent::__construct();
    $this->load->model('board_model');
  }

  function index() {
    $this->load->view('templates/header');
    $this->load->view('templates/navbar');
    $this->load->view('board/register');
    $this->load->view('board/login');
    $this->load->view('board/article');
    $this->load->view('board/updateContent');
    $this->load->view('templates/footer');
  }

  function admin() {
    $this->load->view('templates/header');
    $this->load->view('board/admin');
    $this->load->view('board/updateContent');
    $this->load->view('templates/footer');
  }

  function authorization() {
    $this->load->view('templates/header');
    $this->load->view('board/authorization');
    $this->load->view('templates/footer');
  }

  function create() {
    $this->board_model->set_comment();   
  }

  function update_comment($id) {
    if (!$this->your_comment($id)) return;
    echo $this->board_model->update_comment($id);
  }

  function update_authorization() {
    if ($this->classification() !== 'super_admin') return;
    echo $this->board_model->update_authorization();
  }

  function destroy($id) {
    if (!$this->your_comment($id)) return;
    echo $this->board_model->delete_comment($id);
  }

  function register() {
    $this->form_validation->set_rules('username', 'username', 'required');

    if ($this->form_validation->run() == FALSE){
      echo "<script>alert('請不要留白唷！');
            window.location = 'http://julypenguin.tw/week21';</script>";
    } else {
      foreach ($this->usernames() as $user) {
        if ($this->input->post('username') === $user['username']) {
          echo "<script>alert('帳號重複');
                window.location = 'http://julypenguin.tw/week21';</script>";
          die();
        }
      }
      $user = $this->board_model->set_user();
      $newdata = array(
        'username' => $this->input->post('username')
      );
      $this->session->set_userdata($newdata);
  
      redirect('/', 'location', '301');
    }
  }

  function login() {
    $user = $this->board_model->get_password();

    if (!$user || !password_verify($this->input->post('password') ,$user[0]['password'])) {
      echo "<script>alert('帳號或密碼錯誤');
      window.location = 'http://julypenguin.tw/week21';</script>";
      die();
    }

    $newdata = array(
      'username' => $this->input->post('username')
    );
    $this->session->set_userdata($newdata);
    echo "<script>alert('登入成功');
          window.location = 'http://julypenguin.tw/week21';</script>";
  }

  function logout() {
    $this->session->unset_userdata('username');
    redirect('', 'location', '301');
  }

  function thumbsup() {
    $users = $this->board_model->get_thumbsup();

    if ($users) {
      $this->board_model->delete_thumbsup();
    } else {
      $this->board_model->set_thumbsUp();
    }
  }

  // 這裡開始是 api
  function api_checkuser() {
    $user = $this->board_model->get_me();
    $this->output
    ->set_content_type('application/json')
    ->set_output(json_encode($user, JSON_UNESCAPED_UNICODE));
  }

  function api_users() {
    $users = $this->board_model->get_users();
    $this->output
    ->set_content_type('application/json')
    ->set_output(json_encode($users, JSON_UNESCAPED_UNICODE));
  }

  function api_content() {
    $msgs = $this->board_model->checkSubContent();
    $rows = [];
    foreach ($msgs as $msg) {
      if ($msg['layer'] === (string)1) {
      array_push($rows, $this->api_subcontent(array_map('escape', $msg), 2, 5));
      }
    }
    $this->output
    ->set_content_type('application/json')
    ->set_output(json_encode($rows, JSON_UNESCAPED_UNICODE));
    
  }

  // 其他 method
  private function api_subcontent($row, $layerStart, $layerEnd) {
    $subRow = $row;
    $msgs = $this->board_model->checkSubContent();
    $index = 1;

    foreach($msgs as $msg) {
      if ($msg['layer'] === (string)$layerStart && (string)$row['id'] === $msg['parent_id']) {
        $subRow['subContent' . $index] = array_map('escape', $msg);
        $subRow['subContent' . $index] = ($msg);
        if ($layerStart + 1 <= $layerEnd) {
          $subRow['subContent' . $index] = $this->api_subcontent($subRow['subContent' . $index], $layerStart + 1, $layerEnd);
        }
        $index++;
      }
    }
    return $subRow;
  }

  private function classification() {
    $user = $this->board_model->get_me();
    return $user[0]['classification'];
  }

  private function usernames() {
    return $this->board_model->get_usernames();
  }

  private function your_comment($id) {
    return $this->board_model->get_comment_id($id) || $this->classification() !== 'normal';
  }

}

function escape($str) {
  return  htmlspecialchars($str, ENT_QUOTES, 'utf-8');
}
